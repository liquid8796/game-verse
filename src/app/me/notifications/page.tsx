import type { Metadata } from "next";
import Link from "next/link";
import { MemberNav } from "@/features/auth/components/member-nav";
import { requireCurrentUser } from "@/features/auth/lib/session";
import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "@/features/notifications/actions/notification-actions";
import {
  countUnreadNotifications,
  listNotifications,
} from "@/features/notifications/repository/notification-repository";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};

export default async function NotificationsPage() {
  const member = await requireCurrentUser("/me/notifications");
  const [items, unread] = await Promise.all([
    listNotifications(member.id),
    countUnreadNotifications(member.id),
  ]);

  return (
    <main id="main" className="member-page member-notifications-page">
      <section className="shell member-page-head">
        <div>
          <p className="page-kicker">Your updates</p>
          <h1 className="page-title">Notification <span>center.</span></h1>
          <p className="member-page-deck">
            Read your account notifications here. Unread items are marked so you can
            find them quickly and clear them when you’re done.
          </p>
        </div>
        <div className="member-library-total">
          <span>Unread</span>
          <strong>{unread}</strong>
        </div>
      </section>
      <div className="shell"><MemberNav active="notifications" /></div>
      <section className="shell notifications-wrap">
        {items.length ? (
          <>
            <div className="notifications-toolbar">
              <span>{items.length} recent notifications</span>
              {unread > 0 && (
                <form action={markAllNotificationsReadAction}>
                  <button type="submit">Mark all read</button>
                </form>
              )}
            </div>
            <div className="notifications-list">
              {items.map((item) => (
                <article
                  className={item.readAt ? "notification-item is-read" : "notification-item"}
                  key={item.id}
                >
                  <div className="notification-signal" aria-hidden="true" />
                  <div>
                    <div className="notification-meta">
                      <span>{item.type}</span>
                      <time dateTime={item.createdAt.toISOString()}>
                        {new Intl.DateTimeFormat("en", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        }).format(item.createdAt)}
                      </time>
                    </div>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                    {item.href && <Link href={item.href}>View details <span>↗</span></Link>}
                  </div>
                  {!item.readAt && (
                    <form action={markNotificationReadAction}>
                      <input type="hidden" name="notificationId" value={item.id} />
                      <button type="submit">Mark read</button>
                    </form>
                  )}
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="member-library-empty">
            <span>00 / CLEAR</span>
            <h2>No notifications yet.</h2>
            <p>New account notifications will appear here. In the meantime, your watchlist keeps the games you follow in one place.</p>
            <Link className="button-primary" href="/me/watchlist">Open watchlist</Link>
          </div>
        )}
      </section>
    </main>
  );
}
