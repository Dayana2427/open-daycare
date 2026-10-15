import type { ReactNode } from "react";
import type { CurrentUser } from "@/lib/data/feed";

interface SidebarProps {
  user: CurrentUser;
  activeItem: SidebarItemId;
}

function LogoIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function FeedIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function ChildrenIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
    </svg>
  );
}

function NoticesIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

export type SidebarItemId = "feed" | "kids" | "notices" | "account";

interface NavItem {
  id: SidebarItemId;
  label: string;
  icon: () => ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: "feed", label: "Feed", icon: FeedIcon, href: "/" },
  { id: "kids", label: "Niños", icon: ChildrenIcon, href: "/kids" },
  { id: "notices", label: "Avisos", icon: NoticesIcon, href: "#" },
  { id: "account", label: "Mi cuenta", icon: AccountIcon, href: "#" },
];

const navItemStyles = "flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px]";
const navItemActiveStyles = "bg-coral-wash font-extrabold text-coral-strong";
const navItemIdleStyles = "bg-transparent font-semibold text-nav";

export function Sidebar({ user, activeItem }: SidebarProps) {
  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-none flex-col border-r border-border bg-surface px-4 py-6">
      <a href="#" className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]">
        <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-xl bg-[linear-gradient(155deg,var(--color-brand-start),var(--color-coral-soft))] text-white">
          <LogoIcon />
        </span>
        <span>
          <span className="block font-display text-[17px] leading-none font-semibold text-ink">
            OpenDayCare
          </span>
          <span className="mt-[2px] block text-[11.5px] text-muted">Sala Soles</span>
        </span>
      </a>

      <a
        href="#"
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,var(--color-coral-light),var(--color-coral))] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.75)]"
      >
        <PlusIcon />
        Nueva publicación
      </a>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`${navItemStyles} ${isActive ? navItemActiveStyles : navItemIdleStyles}`}
            >
              <item.icon />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-[10px] border-t border-border pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-[6px]">
          <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-coral-soft font-display text-[16px] font-semibold text-white">
            {user.initial}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-extrabold text-ink">{user.name}</span>
            <span className="block text-[12px] text-muted">{user.role}</span>
          </span>
          <a
            href="#"
            title="Cerrar sesión"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-cream text-muted-dark"
          >
            <LogoutIcon />
          </a>
        </div>
      </div>
    </aside>
  );
}
