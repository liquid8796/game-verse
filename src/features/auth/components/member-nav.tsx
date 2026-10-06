import Link from "next/link";

const memberLinks = [
  ["Profile", "/account", "profile"],
  ["Library", "/me/library", "library"],
] as const;

export function MemberNav({ active }: { active: "profile" | "library" }) {
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
