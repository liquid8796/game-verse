import Link from "next/link";

const memberLinks = [
  ["Profile", "/account", "profile"],
  ["Library", "/me/library", "library"],
  ["Watchlist", "/me/watchlist", "watchlist"],
  ["Saved", "/me/saved", "saved"],
  ["Notifications", "/me/notifications", "notifications"],
  ["Calendar", "/me/calendar", "calendar"],
] as const;

export function MemberNav({
  active,
}: {
  active: "profile" | "library" | "watchlist" | "saved" | "notifications" | "calendar";
}) {
  return (
    <nav className="member-subnav" aria-label="Member navigation">
      {memberLinks.map(([label, href, key]) => (
        <Link key={href} href={href} aria-current={key === active ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
