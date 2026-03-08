"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCog,
  Settings,
  LogOut,
  MessageSquareWarning,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
        alt="UX Compiler logo"
        className="h-4 w-5 rounded-sm object-contain flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        UX Compiler
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
        alt="UX Compiler logo"
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

const DashboardPanel = () => {
  return (
    <div className="flex flex-1 p-0">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 md:p-8 flex flex-col gap-6 flex-1 w-full h-full overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Feedback Reports
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
              Real-time insights from your active user base
            </p>
          </div>
          <button className="rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 text-sm font-medium">
            Send to Github
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            {
              title: "Saving was confusing",
              summary:
                "Unclear success state on save. User clicked the button multiple times before navigation away.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCWapgQQ3AmwhiK5CJBMj0ARy-1Y5060Yrj8ZuV1804VjrznBu1xrIYZ9S9MsLLCpdAcDPdCGO03XzBbCiaaXaIkWHyXJyJVX6ER-K8O0zWLt6dnVIaPiUg4TiX5LPED0slACTaxn6WUmCXCcHhJ2UAz_SQpqIm7lioCrUm0HKyf3woSFORv6bLxQOwFGL9jUvUMKh390KUqWQ2hCAxnrN1hrgKGwo1-GjK2s_udczWQB3XrUADW00MQExy4TxsjIh0JnIa1JJonpg",
              href: "/reports/saving-was-confusing",
            },
            {
              title: "Login loop on mobile",
              summary:
                "Auth token expriration issue. The application fails to refresh tokens correctly on iOS Safari browser.",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCOhpQViS2--itYu_4pN1qJtkouvdPh2mMujY5Gc-vK42idt_vH6-zSYp703aN51DTNLUqzucyxf-_QHPjhfYiLnegLH3QtlEELSIo5S0AmFVvX_qLEeuuzkHD_BZu_dq0N8xtM6XaBxOKbqefWeaos834g3LK6gLqXstqRdVqVK4npj7QijG0gWaILdHHIFNG-4_Y285PeJiWTkrtINrqcfV3EkaIaFSkCEB0Zkk6v1vqGCoRnZoHve_nF6Zs2ZjfFHdW4FGGMBac",
              href: "/reports/login-loop-on-mobile",
            },
            {
              title: "Filter dropdown hidden",
              summary:
                "Z-index conflict with the navigationn bar. Dropdown appears behind header on medium viewports",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCMY5dZQp-I_Vs1h_wraMVdtQeZH_xaNA7wyjakgylJg_jBHt6i25QrU4ZaBL2b7nnxZVgTgL_MO6MnpKuDe3MG-tf39L0JLgG-_J_r74r-5dYi-YCojgMxRjLPm_XVLX_P9IYIGTWKNuAj4xAUNnmFvcL_-VVn4ewtGKcvFpu7RPSiG1RYwJXOdWy-Jr1iY5N6XEpmPzkt5Jq5E0xvcgLvyT73QUTiDcl31PF-nBUAAcgBczmIERTVFzMIFyGagsh1ANAGnKvo-sI",
              href: "/reports/filter-dropdown-hidden",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="block rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div
                  className="h-32 w-full sm:h-28 sm:w-40 rounded-md bg-cover bg-center bg-no-repeat flex-shrink-0"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                      {card.title}
                    </p>
                    <MessageSquareWarning className="h-4 w-4 text-neutral-500 dark:text-neutral-300" />
                  </div>
                  <p className="text-sm md:text-[15px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      AI summary:
                    </span>{" "}
                    {card.summary}
                  </p>
                  <div className="mt-3 flex justify-end">
                    <span className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                      Detail
                    </span>
                  </div>
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
          プロフィール情報を表示するエリアです。
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
          設定画面のプレースホルダーです。
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
          ログアウト確認を表示するエリアです。
        </p>
      </div>
    </div>
  );
};
