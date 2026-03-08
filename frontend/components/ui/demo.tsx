"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCog,
  Settings,
  LogOut,
  MessageSquareWarning,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fetchGroups, type FeedbackGroup } from "@/lib/api";
import logoImage from "@/image.png";
import userImage from "@/image_user.png";

type ActiveView = "dashboard" | "profile" | "settings" | "logout";

export function SidebarDemo() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");

  const links = [
    {
      label: "Dashboard",
      href: "#",
      key: "dashboard" as const,
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      key: "profile" as const,
      icon: (
        <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      key: "settings" as const,
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      key: "logout" as const,
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink
                  key={link.key}
                  link={link}
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveView(link.key);
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Takuma Kono",
                href: "#",
                icon: (
                  <Image
                    src={userImage}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <ContentPanel activeView={activeView} />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src={logoImage}
        alt="Maisen logo"
        className="h-4 w-5 rounded-sm object-contain flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Maisen
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image
        src={logoImage}
        alt="Maisen logo"
        className="h-4 w-5 rounded-sm object-contain flex-shrink-0"
      />
    </Link>
  );
};

const ContentPanel = ({ activeView }: { activeView: ActiveView }) => {
  if (activeView === "profile") {
    return <ProfilePanel />;
  }

  if (activeView === "settings") {
    return <SettingsPanel />;
  }

  if (activeView === "logout") {
    return <LogoutPanel />;
  }

  return <DashboardPanel />;
};

const severityColor: Record<string, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const DashboardPanel = () => {
  const [groups, setGroups] = useState<FeedbackGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups()
      .then(setGroups)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-1 p-0">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 md:p-8 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Feedback Reports
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
              {loading
                ? "Loading..."
                : `${groups.length} issues from your active user base`}
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-700 dark:text-red-300">
            Failed to load reports. Make sure the server is running on port 3001.
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/reports/${group.id}`}
              className="block rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                      {group.title}
                    </p>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                        severityColor[group.severity] ?? severityColor.medium,
                      )}
                    >
                      {group.severity}
                    </span>
                  </div>
                  <MessageSquareWarning className="h-4 w-4 text-neutral-500 dark:text-neutral-300 flex-shrink-0" />
                </div>
                <p className="text-sm md:text-[15px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    AI summary:
                  </span>{" "}
                  {group.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{group.entryCount} reports</span>
                    <span>{group.categories.join(", ")}</span>
                  </div>
                  <span className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                    Detail
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfilePanel = () => {
  return (
    <div className="flex flex-1 p-0">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 md:p-10 w-full">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Profile
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Profile information area.
        </p>
      </div>
    </div>
  );
};

const SettingsPanel = () => {
  return (
    <div className="flex flex-1 p-0">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 md:p-10 w-full">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Settings
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Settings placeholder.
        </p>
      </div>
    </div>
  );
};

const LogoutPanel = () => {
  return (
    <div className="flex flex-1 p-0">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 md:p-10 w-full">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Logout
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          Logout confirmation area.
        </p>
      </div>
    </div>
  );
};
