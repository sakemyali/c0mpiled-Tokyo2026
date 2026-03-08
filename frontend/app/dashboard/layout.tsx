"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  PlusCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import userImage from "@/image_user.png";

const navLinks = [
  {
    label: "Reports",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-[18px] w-[18px] flex-shrink-0" />,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-[18px] w-[18px] flex-shrink-0" />,
  },
  {
    label: "Submit",
    href: "/dashboard/submit",
    icon: <PlusCircle className="h-[18px] w-[18px] flex-shrink-0" />,
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
    <div className="min-h-screen bg-[var(--surface-0)]">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 border-r border-white/[0.06]">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <SidebarLink
                    key={link.href}
                    link={link}
                    active={pathname === link.href}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <SidebarLink
                link={{
                  label: "Back to Home",
                  href: "/",
                  icon: <ArrowLeft className="h-[18px] w-[18px] flex-shrink-0" />,
                }}
              />
              <div className="mt-2 pt-3 border-t border-white/[0.06]">
                <SidebarLink
                  link={{
                    label: "Takuma Kono",
                    href: "#",
                    icon: (
                      <Image
                        src={userImage}
                        className="h-7 w-7 flex-shrink-0 rounded-full ring-2 ring-white/10"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1">
          <div className="flex flex-col flex-1 w-full h-full min-h-screen overflow-y-auto">
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
    className="flex items-center gap-2.5 py-1 relative z-20"
  >
    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center flex-shrink-0">
      <span className="text-[11px] font-extrabold text-[var(--surface-0)] leading-none">M</span>
    </div>
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-semibold text-white whitespace-pre tracking-tight text-sm"
    >
      Maisen
    </motion.span>
  </Link>
);

const LogoIcon = () => (
  <Link
    href="/dashboard"
    className="flex items-center py-1 relative z-20"
  >
    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center flex-shrink-0">
      <span className="text-[11px] font-extrabold text-[var(--surface-0)] leading-none">M</span>
    </div>
  </Link>
);
