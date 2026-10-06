param(
    [string]$HostName = "158.180.59.36",
    [string]$UserName = "ubuntu",
    [string]$IdentityFile = "$HOME\.ssh\jarvis_oci_ed25519",
    [string]$SiteUrl = "https://gameverse.online"
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$Archive = Join-Path $env:TEMP "gameverse-release.tgz"
$Remote = "$UserName@$HostName"
$RemoteArchive = "/tmp/gameverse-release.tgz"

Push-Location $RepoRoot
try {
    if ((git status --porcelain).Length -ne 0) {
        throw "Working tree must be clean before deployment."
    }

    git fetch origin master | Out-Null
    $LocalHead = (git rev-parse HEAD).Trim()
    $RemoteHead = (git rev-parse origin/master).Trim()
    if ($LocalHead -ne $RemoteHead) {
        throw "HEAD must match origin/master before deployment."
    }

    if (Test-Path $Archive) {
        Remove-Item $Archive -Force
    }

    git archive --format=tar.gz --output=$Archive HEAD
    scp -i $IdentityFile -o BatchMode=yes $Archive "${Remote}:$RemoteArchive"

    $bootstrap = @'
set -euo pipefail

APP_ROOT=/opt/gameverse
CURRENT="$APP_ROOT/current"
STAGING="$APP_ROOT/staging"
SHARED="$APP_ROOT/shared"
SITE_URL="__SITE_URL__"

if ! id gameverse >/dev/null 2>&1; then
  sudo useradd --system --home "$APP_ROOT" --shell /usr/sbin/nologin gameverse
fi

sudo install -d -o gameverse -g gameverse -m 0750 "$APP_ROOT"
sudo install -d -o root -g gameverse -m 0750 "$SHARED"

if ! sudo test -f "$SHARED/.env"; then
  DB_PASS="$(openssl rand -hex 24)"
  if sudo -u postgres psql -Atqc "select 1 from pg_roles where rolname='gameverse'" | grep -q 1; then
    sudo -u postgres psql -v ON_ERROR_STOP=1 -c "alter role gameverse with login password '$DB_PASS';"
  else
    sudo -u postgres psql -v ON_ERROR_STOP=1 -c "create role gameverse login password '$DB_PASS';"
  fi
  if ! sudo -u postgres psql -Atqc "select 1 from pg_database where datname='gameverse'" | grep -q 1; then
    sudo -u postgres createdb --owner=gameverse gameverse
  fi
  sudo bash -c "cat > '$SHARED/.env'" <<EOF
DATABASE_URL=postgresql://gameverse:$DB_PASS@127.0.0.1:5432/gameverse
NEXT_PUBLIC_SITE_URL=$SITE_URL
NEXT_PUBLIC_ADS_ENABLED=false
NODE_ENV=production
EOF
  sudo chown root:gameverse "$SHARED/.env"
  sudo chmod 0640 "$SHARED/.env"
fi

if sudo grep -q '^NEXT_PUBLIC_SITE_URL=' "$SHARED/.env"; then
  sudo sed -i "s#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=$SITE_URL#" "$SHARED/.env"
else
  echo "NEXT_PUBLIC_SITE_URL=$SITE_URL" | sudo tee -a "$SHARED/.env" >/dev/null
fi
sudo chown root:gameverse "$SHARED/.env"
sudo chmod 0640 "$SHARED/.env"

sudo rm -rf "$STAGING"
sudo install -d -o gameverse -g gameverse -m 0750 "$STAGING"
sudo tar -xzf /tmp/gameverse-release.tgz -C "$STAGING"
sudo chown -R gameverse:gameverse "$STAGING"

sudo install -o root -g root -m 0644 "$STAGING/deploy/gameverse.service" /etc/systemd/system/gameverse.service
sudo install -o root -g root -m 0644 "$STAGING/deploy/gameverse.caddy" /etc/caddy/conf.d/gameverse.caddy

sudo -u gameverse bash -lc "cd '$STAGING' && set -a && source '$SHARED/.env' && set +a && npm ci --include=dev && npm run db:migrate && npm run db:seed && npm run build && npm prune --omit=dev"

sudo systemctl daemon-reload
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy

if sudo systemctl is-active --quiet gameverse.service; then
  sudo systemctl stop gameverse.service
fi
sudo rm -rf "$CURRENT"
sudo mv "$STAGING" "$CURRENT"
sudo chown -R gameverse:gameverse "$CURRENT"

sudo systemctl enable gameverse.service >/dev/null
sudo systemctl restart gameverse.service

for attempt in $(seq 1 30); do
  if curl --fail --silent http://127.0.0.1:3003/api/health >/tmp/gameverse-health.json; then
    cat /tmp/gameverse-health.json
    rm -f /tmp/gameverse-health.json /tmp/gameverse-release.tgz
    exit 0
  fi
  sleep 1
done

sudo systemctl --no-pager --full status gameverse.service
exit 1
'@

    $bootstrap = $bootstrap.Replace("__SITE_URL__", $SiteUrl)
    $bootstrap | ssh -i $IdentityFile -o BatchMode=yes $Remote "bash -s"

    Invoke-WebRequest -UseBasicParsing -Uri "$SiteUrl/api/health" -TimeoutSec 15 |
        Select-Object -ExpandProperty Content
}
finally {
    Pop-Location
    if (Test-Path $Archive) {
        Remove-Item $Archive -Force
    }
}
