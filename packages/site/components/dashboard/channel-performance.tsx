"use client";

import {
  Clock,
  Hash,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const channelData = [
  {
    name: "general",
    messages: 12847,
    members: 1234,
    avgLength: 42,
    responseTime: 3.2,
    growth: 12.5,
    type: "text",
    color: "#3b82f6",
  },
  {
    name: "announcements",
    messages: 289,
    members: 1234,
    avgLength: 156,
    responseTime: 0,
    growth: -2.1,
    type: "text",
    color: "#10b981",
  },
  {
    name: "gaming-chat",
    messages: 8956,
    members: 856,
    avgLength: 38,
    responseTime: 1.8,
    growth: 18.7,
    type: "text",
    color: "#f59e0b",
  },
  {
    name: "off-topic",
    messages: 6734,
    members: 634,
    avgLength: 51,
    responseTime: 4.1,
    growth: 8.3,
    type: "text",
    color: "#ef4444",
  },
  {
    name: "tech-support",
    messages: 4523,
    members: 423,
    avgLength: 89,
    responseTime: 12.5,
    growth: -5.2,
    type: "text",
    color: "#8b5cf6",
  },
  {
    name: "feedback",
    messages: 2967,
    members: 267,
    avgLength: 124,
    responseTime: 8.7,
    growth: 15.4,
    type: "text",
    color: "#06b6d4",
  },
  {
    name: "events",
    messages: 1856,
    members: 156,
    avgLength: 67,
    responseTime: 2.3,
    growth: 22.1,
    type: "text",
    color: "#f97316",
  },
  {
    name: "introductions",
    messages: 1298,
    members: 98,
    avgLength: 78,
    responseTime: 5.6,
    growth: 9.8,
    type: "text",
    color: "#84cc16",
  },
];

const voiceChannelData = [
  { name: "General Voice", minutes: 14567, peakUsers: 23, avgSession: 45 },
  { name: "Gaming Lounge", minutes: 28934, peakUsers: 45, avgSession: 78 },
  { name: "Study Hall", minutes: 8923, peakUsers: 12, avgSession: 120 },
  { name: "Music Room", minutes: 5634, peakUsers: 8, avgSession: 67 },
];

const viewModes = [
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "members", label: "Members", icon: Users },
  { key: "voice", label: "Voice Usage", icon: Clock },
];

export function ChannelPerformance() {
  const [viewMode, setViewMode] = useState("messages");
  const [timeRange, setTimeRange] = useState("7D");

  const sortedChannels = [...channelData].sort(
    (a, b) => b.messages - a.messages,
  );
  const topChannel = sortedChannels[0];
  const totalMessages = channelData.reduce(
    (sum, channel) => sum + channel.messages,
    0,
  );

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="font-inter text-xl flex items-center gap-2">
            <Hash className="w-5 h-5 text-blue-500" />
            Channel Performance
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Activity breakdown across all channels
          </p>
        </div>
        <div className="flex gap-2">
          {["7D", "30D", "90D"].map((range) => (
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
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Total Messages</div>
            <div className="text-2xl font-bold">
              {totalMessages.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="w-3 h-3" />
              +12.3% vs last week
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Most Active</div>
            <div className="text-lg font-semibold">#{topChannel.name}</div>
            <div className="text-xs text-muted-foreground">
              {topChannel.messages.toLocaleString()} messages
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Avg Response Time
            </div>
            <div className="text-2xl font-bold">4.2m</div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingDown className="w-3 h-3" />
              -15% faster
            </div>
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {viewModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Button
                key={mode.key}
                variant={viewMode === mode.key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode(mode.key)}
                className="flex-1 h-8 gap-2"
              >
                <Icon className="w-4 h-4" />
                {mode.label}
              </Button>
            );
          })}
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === "voice" ? (
              <BarChart data={voiceChannelData} layout="horizontal">
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k min`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number) => [
                    `${value.toLocaleString()} minutes`,
                    "Voice Time",
                  ]}
                />
                <Bar dataKey="minutes" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            ) : (
              <BarChart data={sortedChannels} layout="horizontal">
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) =>
                    viewMode === "messages"
                      ? `${(value / 1000).toFixed(0)}k`
                      : value.toString()
                  }
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  width={100}
                  tickFormatter={(value) => `#${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value: number, _name: string) => [
                    value.toLocaleString(),
                    viewMode === "messages" ? "Messages" : "Members",
                  ]}
                />
                <Bar dataKey={viewMode} fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Channel Details</h4>
          <div className="space-y-2">
            {sortedChannels.slice(0, 6).map((channel, index) => (
              <div
                key={channel.name}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-lg font-bold text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-medium">#{channel.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Avg {channel.avgLength} chars • {channel.responseTime}m
                      response time
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {channel.messages.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs flex items-center gap-1 ${
                      channel.growth >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {channel.growth >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(channel.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
