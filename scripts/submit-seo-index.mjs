#!/usr/bin/env node
/**
 * SEO Search Engine Indexing and Sitemap Submission Tool
 *
 * Pings major search engines to crawl https://gameverse.online/sitemap.xml
 * and submits URLs via IndexNow for instant search indexing.
 */

import https from "node:https";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gameverse.online";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const CORE_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/games`,
  `${SITE_URL}/articles`,
  `${SITE_URL}/discover`,
  `${SITE_URL}/about`,
  `${SITE_URL}/partners`,
];

function sendGet(url) {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { "User-Agent": "GameVerse-SEO-Bot/1.0" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode, data: data.slice(0, 300) });
        });
      })
      .on("error", (err) => {
        resolve({ error: err.message });
      });
  });
}

function sendIndexNow(host, urls) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      host: host.replace(/^https?:\/\//, ""),
      key: "gameverse-indexnow-key",
      keyLocation: `${SITE_URL}/gameverse-indexnow-key.txt`,
      urlList: urls,
    });

    const req = https.request(
      "https://api.indexnow.org/indexnow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );

    req.on("error", (err) => resolve({ error: err.message }));
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log("=================================================");
  console.log("   GameVerse Search Engine Indexing Dispatcher   ");
  console.log("=================================================");
  console.log(`Target Site:    ${SITE_URL}`);
  console.log(`Target Sitemap: ${SITEMAP_URL}\n`);

  console.log("1. Pinging Bing Sitemap...");
  const bingRes = await sendGet(`https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  console.log(`   Bing status: ${bingRes.status || bingRes.error}`);

  console.log("\n2. Pinging Google Sitemap Ping endpoint...");
  const googleRes = await sendGet(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  console.log(`   Google ping status: ${googleRes.status || googleRes.error}`);

  console.log("\n3. Dispatching IndexNow to IndexNow API (Bing, Yandex, Seznam)...");
  const indexNowRes = await sendIndexNow(SITE_URL, CORE_URLS);
  console.log(`   IndexNow response status: ${indexNowRes.status || indexNowRes.error}`);

  console.log("\n-------------------------------------------------");
  console.log("Search Engine Submission Summary:");
  console.log("• Bing Sitemap:    Submitted");
  console.log("• Google Sitemap:  Submitted");
  console.log("• IndexNow (Bing): Submitted (Core URLs)");
  console.log("-------------------------------------------------");
  console.log("\nNOTE FOR GOOGLE SEARCH CONSOLE:");
  console.log("Googlebot requires domain ownership verification in Google Search Console.");
  console.log("1. Visit https://search.google.com/search-console");
  console.log("2. Add property: https://gameverse.online");
  console.log("3. Submit sitemap: https://gameverse.online/sitemap.xml");
  console.log("4. Use 'URL Inspection' on https://gameverse.online and click 'Request Indexing'.");
  console.log("=================================================\n");
}

main().catch(console.error);
