"use client";

import { TrendingUp, UserMinus, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const memberData = [
  {
    date: "2024-01-01",
    members: 11800,
    joins: 125,
    leaves: 45,
    retention: 92.5,
  },
  {
    date: "2024-01-02",
    members: 11920,
    joins: 180,
    leaves: 60,
    retention: 93.1,
  },
  {
    date: "2024-01-03",
    members: 12045,
    joins: 195,
    leaves: 70,
    retention: 92.8,
  },
  {
    date: "2024-01-04",
    members: 12170,
    joins: 210,
    leaves: 85,
    retention: 93.4,
  },
  {
    date: "2024-01-05",
    members: 12290,
    joins: 185,
    leaves: 65,
    retention: 94.1,
  },
  {
    date: "2024-01-06",
    members: 12415,
    joins: 225,
    leaves: 100,
    retention: 93.7,
  },
  {
    date: "2024-01-07",
    members: 12540,
    joins: 250,
    leaves: 125,
    retention: 94.2,
  },
  {
    date: "2024-01-08",
    members: 12665,
    joins: 245,
    leaves: 120,
    retention: 94.8,
  },
  {
    date: "2024-01-09",
    members: 12785,
    joins: 240,
    leaves: 120,
    retention: 95.1,
  },
  {
    date: "2024-01-10",
    members: 12910,
    joins: 275,
    leaves: 150,
    retention: 94.6,
  },
  {
    date: "2024-01-11",
    members: 13035,
    joins: 295,
    leaves: 170,
    retention: 95.2,
  },
  {
    date: "2024-01-12",
    members: 13160,
    joins: 320,
    leaves: 195,
    retention: 94.9,
  },
  {
    date: "2024-01-13",
    members: 13280,
    joins: 300,
    leaves: 180,
    retention: 95.4,
  },
  {
    date: "2024-01-14",
    members: 13405,
    joins: 325,
    leaves: 200,
    retention: 95.1,
  },
  {
    date: "2024-01-15",
    members: 13530,
    joins: 350,
    leaves: 225,
    retention: 95.7,
  },
  {
    date: "2024-01-16",
    members: 13650,
    joins: 340,
    leaves: 220,
    retention: 95.3,
  },
  {
    date: "2024-01-17",
    members: 13775,
    joins: 365,
    leaves: 240,
    retention: 95.8,
  },
  {
    date: "2024-01-18",
    members: 13895,
    joins: 360,
    leaves: 240,
    retention: 96.1,
  },
  {
    date: "2024-01-19",
    members: 14020,
    joins: 385,
    leaves: 260,
    retention: 95.9,
  },
  {
    date: "2024-01-20",
    members: 14147,
    joins: 387,
    leaves: 260,
    retention: 96.2,
  },
];

const viewOptions = [
  { key: "members", label: "Total Members", color: "#3b82f6" },
  { key: "joins", label: "Joins vs Leaves", color: "#10b981" },
  { key: "retention", label: "Retention Rate", color: "#8b5cf6" },
];

export function MemberGrowthChart() {
  const [activeView, setActiveView] = useState("members");
  const [timeRange, setTimeRange] = useState("20D");

  const latestData = memberData[memberData.length - 1];
  const previousData = memberData[memberData.length - 2];
  const memberGrowth = (
    ((latestData.members - previousData.members) / previousData.members) *
    100
  ).toFixed(1);
  const joinRate = latestData.joins;
  const leaveRate = latestData.leaves;
  const netGrowth = joinRate - leaveRate;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="font-inter text-xl">Member Analytics</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Track community growth and member lifecycle
          </p>
        </div>
        <div className="flex gap-2">
          {["7D", "20D", "30D", "90D"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="h-8"
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Total Members</span>
            </div>
            <div className="text-2xl font-bold">
              {latestData.members.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-500">+{memberGrowth}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Joins Today</span>
            </div>
            <div className="text-2xl font-bold text-green-500">{joinRate}</div>
            <div className="text-xs text-muted-foreground">New members</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserMinus className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">Leaves Today</span>
            </div>
            <div className="text-2xl font-bold text-red-500">{leaveRate}</div>
            <div className="text-xs text-muted-foreground">Members left</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Net Growth</span>
            </div>
            <div
              className={`text-2xl font-bold ${netGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {netGrowth >= 0 ? "+" : ""}
              {netGrowth}
            </div>
            <div className="text-xs text-muted-foreground">Today's change</div>
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {viewOptions.map((option) => (
            <Button
              key={option.key}
              variant={activeView === option.key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveView(option.key)}
              className="flex-1 h-8"
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <div>
              {activeView === "members" && (
                <AreaChart data={memberData}>
                  <defs>
                    <linearGradient
                      id="memberGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
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
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                    formatter={(value: number) => [
                      value.toLocaleString(),
                      "Total Members",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="members"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#memberGradient)"
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </AreaChart>
              )}

              {activeView === "joins" && (
                <BarChart data={memberData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                  />
                  <Bar dataKey="joins" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="leaves" fill="#ef4444" radius={[2, 2, 0, 0]} />
                </BarChart>
              )}

              {activeView === "retention" && (
                <LineChart data={memberData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    domain={["dataMin - 1", "dataMax + 1"]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                    formatter={(value: number) => [
                      `${value}%`,
                      "Retention Rate",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
                  />
                </LineChart>
              )}
              {!["members", "joins", "retention"].includes(activeView) && (
                <div />
              )}
            </div>
          </ResponsiveContainer>
        </div>

        {activeView === "joins" && (
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>New Joins</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Members Left</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
