"use client";

import { Clock, Heart, MessageSquare, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const messageVolumeData = [
  {
    date: "2024-01-01",
    messages: 1847,
    channels: 8,
    avgLength: 45,
    sentiment: 0.72,
  },
  {
    date: "2024-01-02",
    messages: 2156,
    channels: 9,
    avgLength: 42,
    sentiment: 0.68,
  },
  {
    date: "2024-01-03",
    messages: 1923,
    channels: 8,
    avgLength: 48,
    sentiment: 0.75,
  },
  {
    date: "2024-01-04",
    messages: 2834,
    channels: 12,
    avgLength: 41,
    sentiment: 0.71,
  },
  {
    date: "2024-01-05",
    messages: 2567,
    channels: 11,
    avgLength: 44,
    sentiment: 0.69,
  },
  {
    date: "2024-01-06",
    messages: 3245,
    channels: 14,
    avgLength: 39,
    sentiment: 0.73,
  },
  {
    date: "2024-01-07",
    messages: 2891,
    channels: 13,
    avgLength: 46,
    sentiment: 0.76,
  },
  {
    date: "2024-01-08",
    messages: 2634,
    channels: 12,
    avgLength: 43,
    sentiment: 0.74,
  },
  {
    date: "2024-01-09",
    messages: 3156,
    channels: 15,
    avgLength: 40,
    sentiment: 0.72,
  },
  {
    date: "2024-01-10",
    messages: 2945,
    channels: 14,
    avgLength: 47,
    sentiment: 0.78,
  },
  {
    date: "2024-01-11",
    messages: 3423,
    channels: 16,
    avgLength: 38,
    sentiment: 0.71,
  },
  {
    date: "2024-01-12",
    messages: 3789,
    channels: 17,
    avgLength: 41,
    sentiment: 0.75,
  },
  {
    date: "2024-01-13",
    messages: 3234,
    channels: 15,
    avgLength: 44,
    sentiment: 0.73,
  },
  {
    date: "2024-01-14",
    messages: 3567,
    channels: 16,
    avgLength: 42,
    sentiment: 0.77,
  },
];

const hourlyActivityData = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  messages: Math.floor(Math.random() * 500) + 100,
  users: Math.floor(Math.random() * 50) + 10,
}));

const responseTimeData = [
  { channel: "tech-support", avgTime: 12.5, target: 15, satisfaction: 4.2 },
  { channel: "general", avgTime: 3.2, target: 5, satisfaction: 4.6 },
  { channel: "feedback", avgTime: 8.7, target: 10, satisfaction: 4.4 },
  { channel: "gaming-chat", avgTime: 1.8, target: 3, satisfaction: 4.8 },
  { channel: "events", avgTime: 2.3, target: 5, satisfaction: 4.7 },
];

export function MessageAnalytics() {
  const [viewMode, setViewMode] = useState("volume");
  const [timeRange, setTimeRange] = useState("14D");

  const totalMessages = messageVolumeData.reduce(
    (sum, day) => sum + day.messages,
    0,
  );
  const avgSentiment =
    messageVolumeData.reduce((sum, day) => sum + day.sentiment, 0) /
    messageVolumeData.length;
  const peakHour = hourlyActivityData.reduce((max, hour) =>
    hour.messages > max.messages ? hour : max,
  );

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="font-inter text-xl flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            Message Analytics
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Communication patterns and engagement metrics
          </p>
        </div>
        <div className="flex gap-2">
          {["7D", "14D", "30D"].map((range) => (
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
        {/* Summary metrics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              Total Messages
            </div>
            <div className="text-2xl font-bold">
              {totalMessages.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              <TrendingUp className="w-3 h-3" />
              +18.5%
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Peak Hour
            </div>
            <div className="text-2xl font-bold">{peakHour.hour}:00</div>
            <div className="text-xs text-muted-foreground">
              {peakHour.messages} messages
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4" />
              Avg Length
            </div>
            <div className="text-2xl font-bold">43</div>
            <div className="text-xs text-muted-foreground">characters</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" />
              Sentiment
            </div>
            <div className="text-2xl font-bold">
              {(avgSentiment * 100).toFixed(0)}%
            </div>
            <Badge variant="secondary" className="text-xs">
              Positive
            </Badge>
          </div>
        </div>

        {/* View mode selector */}
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          {[
            { key: "volume", label: "Message Volume" },
            { key: "hourly", label: "Hourly Activity" },
            { key: "response", label: "Response Times" },
          ].map((mode) => (
            <Button
              key={mode.key}
              variant={viewMode === mode.key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode.key)}
              className="flex-1 h-8"
            >
              {mode.label}
            </Button>
          ))}
        </div>

        {/* Charts */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <div>
              {viewMode === "volume" && (
                <AreaChart data={messageVolumeData}>
                  <defs>
                    <linearGradient
                      id="messageGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#8b5cf6"
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
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
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
                      "Messages",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#messageGradient)"
                  />
                </AreaChart>
              )}

              {viewMode === "hourly" && (
                <BarChart data={hourlyActivityData}>
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => `${value}:00`}
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
                    labelFormatter={(value) => `${value}:00`}
                    formatter={(value: number) => [value, "Messages"]}
                  />
                  <Bar
                    dataKey="messages"
                    fill="#8b5cf6"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              )}

              {viewMode === "response" && (
                <BarChart data={responseTimeData} layout="horizontal">
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => `${value}m`}
                  />
                  <YAxis
                    type="category"
                    dataKey="channel"
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
                    formatter={(value: number) => [
                      `${value} minutes`,
                      "Avg Response Time",
                    ]}
                  />
                  <Bar dataKey="avgTime" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              )}
            </div>
          </ResponsiveContainer>
        </div>

        {/* Response time details for support channels */}
        {viewMode === "response" && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Response Time Performance</h4>
            <div className="space-y-2">
              {responseTimeData.map((channel) => (
                <div
                  key={channel.channel}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <div className="font-medium">#{channel.channel}</div>
                    <div className="text-xs text-muted-foreground">
                      Target: {channel.target}m • Satisfaction:{" "}
                      {channel.satisfaction}/5
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{channel.avgTime}m</div>
                    <Badge
                      variant={
                        channel.avgTime <= channel.target
                          ? "default"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {channel.avgTime <= channel.target
                        ? "On Target"
                        : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
