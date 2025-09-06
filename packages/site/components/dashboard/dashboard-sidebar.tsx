"use client";

import {
  CreditCard,
  FileText,
  Hash,
  Home,
  Lock,
  MessageSquare,
  Server,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Members", href: "/dashboard/members", icon: Users },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Channels", href: "/dashboard/channels", icon: Hash },
  {
    name: "Engagement",
    href: "/dashboard/engagement",
    icon: TrendingUp,
    locked: true,
    tier: "Growth",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    locked: true,
    tier: "Growth",
  },
  { name: "Servers", href: "/dashboard/servers", icon: Server },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar/95 backdrop-blur-sm border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border/50">
        <Image
          src="/discord-analytics-logo.png"
          alt="Discord Analytics"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="font-inter font-bold text-lg text-sidebar-foreground">
          Discord Analytics
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200",
                isActive &&
                  "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm",
                item.locked && "opacity-60 cursor-not-allowed",
              )}
              asChild={!item.locked}
            >
              {item.locked ? (
                <div className="flex items-center gap-3 p-2">
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 font-medium">{item.name}</span>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                    <Badge
                      variant="outline"
                      className="text-xs border-primary/20 text-primary"
                    >
                      {item.tier}
                    </Badge>
                  </div>
                </div>
              ) : (
                <Link href={item.href} className="flex items-center gap-3 p-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl p-4 border border-primary/20 backdrop-blur-sm">
          <div className="font-inter font-semibold text-sm text-sidebar-foreground mb-1">
            Upgrade to Growth
          </div>
          <div className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Unlock advanced engagement insights and custom reports
          </div>
          <Button
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Upgrade Now
          </Button>
        </div>
      </div>

      <div className="absolute bottom-2 right-4 text-xs text-muted-foreground/40 font-medium">
        Powered by DiscordAnalytics
      </div>
    </div>
  );
}
