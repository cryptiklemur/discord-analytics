import {
  Activity,
  Clock,
  Heart,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const metrics = [
  {
    title: "Total Members",
    value: "12,847",
    change: "+12.5%",
    changeLabel: "vs last week",
    trend: "up",
    icon: Users,
    color: "blue",
    sparkline: [820, 845, 822, 890, 878, 925, 912, 968, 1042, 1145, 1248, 1284],
    description: "Active community members",
  },
  {
    title: "Daily Active Users",
    value: "3,456",
    change: "+8.2%",
    changeLabel: "vs yesterday",
    trend: "up",
    icon: Activity,
    color: "green",
    sparkline: [215, 268, 246, 322, 298, 375, 343, 428, 456, 492, 535, 578],
    description: "Users active in last 24h",
  },
  {
    title: "Messages Today",
    value: "28,947",
    change: "-3.1%",
    changeLabel: "vs yesterday",
    trend: "down",
    icon: MessageSquare,
    color: "purple",
    sparkline: [
      1800, 2120, 1980, 2340, 2180, 2650, 2445, 2860, 2755, 3070, 2965, 2894,
    ],
    description: "Messages sent today",
  },
  {
    title: "Member Growth Rate",
    value: "4.2%",
    change: "+0.8%",
    changeLabel: "week over week",
    trend: "up",
    icon: TrendingUp,
    color: "emerald",
    sparkline: [2.1, 2.5, 3.2, 2.8, 3.6, 3.8, 4.1, 4.2, 4.5, 4.3, 4.1, 4.2],
    description: "Weekly growth rate",
  },
  {
    title: "Voice Minutes Today",
    value: "14,567",
    change: "+15.3%",
    changeLabel: "vs yesterday",
    trend: "up",
    icon: Clock,
    color: "orange",
    sparkline: [
      850, 920, 875, 1020, 965, 1180, 1075, 1290, 1185, 1395, 1292, 1456,
    ],
    description: "Total voice activity",
  },
  {
    title: "Server Health Score",
    value: "87",
    change: "+2 pts",
    changeLabel: "vs last week",
    trend: "up",
    icon: Heart,
    color: "pink",
    sparkline: [80, 82, 81, 84, 83, 85, 86, 87, 88, 87, 86, 87],
    description: "Overall community health",
    suffix: "/100",
  },
];

const colorMap = {
  blue: "bg-blue-500/20 border-blue-500/30",
  green: "bg-green-500/20 border-green-500/30",
  purple: "bg-purple-500/20 border-purple-500/30",
  emerald: "bg-emerald-500/20 border-emerald-500/30",
  orange: "bg-orange-500/20 border-orange-500/30",
  pink: "bg-pink-500/20 border-pink-500/30",
};

const sparklineColorMap = {
  blue: "bg-blue-500/40",
  green: "bg-green-500/40",
  purple: "bg-purple-500/40",
  emerald: "bg-emerald-500/40",
  orange: "bg-orange-500/40",
  pink: "bg-pink-500/40",
};

export function OverviewMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === "up";

        return (
          <Card
            key={metric.title}
            className={cn(
              "border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group",
              colorMap[metric.color as keyof typeof colorMap],
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    colorMap[metric.color as keyof typeof colorMap],
                  )}
                >
                  <Icon className="w-4 h-4 text-foreground" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
                    isPositive
                      ? "text-green-400 bg-green-500/10"
                      : "text-red-400 bg-red-500/10",
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {metric.change}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-baseline gap-1">
                  <div className="font-inter text-2xl font-bold text-foreground">
                    {metric.value}
                  </div>
                  {metric.suffix && (
                    <span className="text-lg font-medium text-muted-foreground">
                      {metric.suffix}
                    </span>
                  )}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {metric.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
                <div className="text-xs text-muted-foreground/80">
                  {metric.changeLabel}
                </div>
              </div>

              <div className="h-10 flex items-end gap-0.5 group-hover:gap-1 transition-all duration-300">
                {metric.sparkline.map((value, index) => {
                  const maxValue = Math.max(...metric.sparkline);
                  const height = (value / maxValue) * 100;
                  const isLast = index === metric.sparkline.length - 1;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "rounded-sm flex-1 transition-all duration-300 group-hover:opacity-80",
                        sparklineColorMap[
                          metric.color as keyof typeof sparklineColorMap
                        ],
                        isLast && "opacity-100 shadow-sm",
                      )}
                      style={{ height: `${Math.max(height, 8)}%` }}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
