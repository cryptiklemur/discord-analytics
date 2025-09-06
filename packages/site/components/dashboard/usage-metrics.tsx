"use client";

import {
  AlertTriangle,
  Database,
  FileText,
  Server,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const usageData = [
  { month: "Oct", dataPoints: 78000, apiCalls: 3200, reports: 8 },
  { month: "Nov", dataPoints: 85000, apiCalls: 4100, reports: 12 },
  { month: "Dec", dataPoints: 92000, apiCalls: 4800, reports: 15 },
  { month: "Jan", dataPoints: 45000, apiCalls: 1247, reports: 3 },
];

const currentUsage = {
  dataPoints: { current: 45000, limit: 100000, percentage: 45 },
  apiCalls: { current: 1247, limit: 5000, percentage: 25 },
  reports: { current: 3, limit: 10, percentage: 30 },
  servers: { current: 2, limit: 3, percentage: 67 },
};

const getUsageColor = (percentage: number) => {
  if (percentage >= 90) return "text-red-500";
  if (percentage >= 75) return "text-orange-500";
  if (percentage >= 50) return "text-yellow-500";
  return "text-green-500";
};

const _getProgressColor = (percentage: number) => {
  if (percentage >= 90) return "bg-red-500";
  if (percentage >= 75) return "bg-orange-500";
  if (percentage >= 50) return "bg-yellow-500";
  return "bg-green-500";
};

export function UsageMetrics() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-inter text-xl flex items-center gap-2">
          <Database className="w-5 h-5 text-purple-500" />
          Usage Analytics
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Monitor your resource consumption and limits
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Usage Overview */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              key: "dataPoints",
              label: "Data Points",
              icon: Database,
              color: "purple",
            },
            { key: "apiCalls", label: "API Calls", icon: Zap, color: "blue" },
            {
              key: "reports",
              label: "Reports",
              icon: FileText,
              color: "green",
            },
            { key: "servers", label: "Servers", icon: Server, color: "orange" },
          ].map((metric) => {
            const usage = currentUsage[metric.key as keyof typeof currentUsage];
            const Icon = metric.icon;

            return (
              <div key={metric.key} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{metric.label}</span>
                  </div>
                  {usage.percentage >= 75 && (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold">
                      {usage.current.toLocaleString()} /{" "}
                      {usage.limit.toLocaleString()}
                    </span>
                    <span className={getUsageColor(usage.percentage)}>
                      {usage.percentage}%
                    </span>
                  </div>
                  <Progress value={usage.percentage} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage Trend Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">
              Usage Trends (Last 4 Months)
            </h4>
            <Badge variant="outline" className="text-xs">
              Data Points
            </Badge>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    "Data Points",
                  ]}
                />
                <Bar
                  dataKey="dataPoints"
                  fill="#8b5cf6"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage Alerts */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Usage Alerts</h4>

          {Object.entries(currentUsage).map(([key, usage]) => {
            if (usage.percentage < 75) return null;

            return (
              <div
                key={key}
                className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-orange-500 text-sm">
                      {key.charAt(0).toUpperCase() + key.slice(1)} Usage High
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      You've used {usage.percentage}% of your {key} limit.
                      Consider upgrading to avoid service interruption.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {Object.values(currentUsage).every(
            (usage) => usage.percentage < 75,
          ) && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <div>
                  <h5 className="font-medium text-green-500 text-sm">
                    Usage Healthy
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    All usage metrics are within normal ranges.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
