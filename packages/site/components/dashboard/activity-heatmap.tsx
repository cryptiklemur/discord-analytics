"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Generate sample heatmap data (24 hours x 7 days)
const generateHeatmapData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return days.map((day) => ({
    day,
    hours: hours.map((hour) => ({
      hour,
      activity: Math.floor(Math.random() * 100) + 1,
    })),
  }));
};

const heatmapData = generateHeatmapData();

const getActivityColor = (activity: number) => {
  if (activity < 20) return "bg-blue-500/10";
  if (activity < 40) return "bg-blue-500/30";
  if (activity < 60) return "bg-blue-500/50";
  if (activity < 80) return "bg-blue-500/70";
  return "bg-blue-500/90";
};

export function ActivityHeatmap() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Activity Heatmap</CardTitle>
        <p className="text-sm text-muted-foreground">
          Peak activity times throughout the week
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Hour labels */}
          <div className="flex gap-1 ml-12">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className="w-4 text-xs text-muted-foreground text-center"
              >
                {i % 6 === 0 ? i : ""}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {heatmapData.map((dayData) => (
            <div key={dayData.day} className="flex items-center gap-1">
              <div className="w-10 text-xs text-muted-foreground text-right">
                {dayData.day}
              </div>
              <div className="flex gap-1">
                {dayData.hours.map((hourData) => (
                  <div
                    key={hourData.hour}
                    className={cn(
                      "w-4 h-4 rounded-sm border border-border/20",
                      getActivityColor(hourData.activity),
                    )}
                    title={`${dayData.day} ${hourData.hour}:00 - ${hourData.activity}% activity`}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Less active</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-blue-500/10 border border-border/20" />
              <div className="w-3 h-3 rounded-sm bg-blue-500/30 border border-border/20" />
              <div className="w-3 h-3 rounded-sm bg-blue-500/50 border border-border/20" />
              <div className="w-3 h-3 rounded-sm bg-blue-500/70 border border-border/20" />
              <div className="w-3 h-3 rounded-sm bg-blue-500/90 border border-border/20" />
            </div>
            <span>More active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
