export function AdSlot({ name, format = "leaderboard" }: { name: string; format?: "leaderboard" | "rectangle" }) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== "true") return null;
  return (
    <aside className={"ad-slot ad-slot-" + format} aria-label="Advertisement" data-ad-slot={name}>
      <span>Advertisement</span><div data-ad-mount={name} />
    </aside>
  );
}
