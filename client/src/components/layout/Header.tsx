import { Link, useLocation } from "react-router"
import {
  LayoutDashboard,
  BarChart3,
  MessageSquarePlus,
  MessageSquareText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "Submit Feedback", path: "/submit", icon: MessageSquarePlus },
] as const

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-card/50 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        {/* Logo / Title */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <MessageSquareText className="h-5 w-5 text-primary" />
          <span>Maisen</span>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute inset-x-1 -bottom-[9px] h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
