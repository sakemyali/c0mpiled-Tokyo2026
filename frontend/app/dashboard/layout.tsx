"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  PlusCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logoImage from "@/image.png";
import userImage from "@/image_user.png";

const navLinks = [
  {
    label: "Reports",
    href: "/dashboard",
    icon: <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
  {
    label: "Submit",
    href: "/dashboard/submit",
    icon: <PlusCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen p-2 md:p-3 bg-neutral-50 dark:bg-neutral-950">
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full border border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-1.5rem)]",
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <SidebarLink
                    key={link.href}
                    link={link}
                    className={cn(
                      pathname === link.href &&
                        "bg-neutral-200 dark:bg-neutral-700 rounded-md"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <SidebarLink
                link={{
                  label: "Back to Home",
                  href: "/",
                  icon: <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
                }}
              />
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
        <div className="flex flex-1 p-0">
          <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col flex-1 w-full h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const Logo = () => (
  <Link
    href="/dashboard"
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

const LogoIcon = () => (
  <Link
    href="/dashboard"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <Image
      src={logoImage}
      alt="Maisen logo"
      className="h-4 w-5 rounded-sm object-contain flex-shrink-0"
    />
  </Link>
);
