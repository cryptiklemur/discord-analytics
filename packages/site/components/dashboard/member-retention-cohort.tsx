"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cohortData = [
  {
    joinWeek: "Dec 25-31",
    newMembers: 245,
    retention: {
      week1: 89.4,
      week2: 76.3,
      week3: 68.2,
      week4: 62.9,
      week8: 54.7,
      week12: 48.2,
    },
  },
  {
    joinWeek: "Jan 1-7",
    newMembers: 312,
    retention: {
      week1: 91.7,
      week2: 78.8,
      week3: 71.5,
      week4: 65.4,
      week8: 57.1,
      week12: null,
    },
  },
  {
    joinWeek: "Jan 8-14",
    newMembers: 287,
    retention: {
      week1: 88.5,
      week2: 75.6,
      week3: 69.3,
      week4: 63.8,
      week8: null,
      week12: null,
    },
  },
  {
    joinWeek: "Jan 15-21",
    newMembers: 356,
    retention: {
      week1: 92.1,
      week2: 79.2,
      week3: 72.8,
      week4: null,
      week8: null,
      week12: null,
    },
  },
];

const getRetentionColor = (retention: number | null) => {
  if (retention === null) return "bg-muted/30";
  if (retention >= 80) return "bg-green-500/80";
  if (retention >= 70) return "bg-green-500/60";
  if (retention >= 60) return "bg-yellow-500/60";
  if (retention >= 50) return "bg-orange-500/60";
  return "bg-red-500/60";
};

export function MemberRetentionCohort() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-inter text-lg">
          Member Retention Cohorts
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Percentage of members retained by join week
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 text-xs font-medium text-muted-foreground">
            <div>Join Week</div>
            <div className="text-center">New</div>
            <div className="text-center">Week 1</div>
            <div className="text-center">Week 2</div>
            <div className="text-center">Week 3</div>
            <div className="text-center">Week 4</div>
            <div className="text-center">Week 8</div>
            <div className="text-center">Week 12</div>
          </div>

          {/* Cohort rows */}
          {cohortData.map((cohort, index) => (
            <div key={index} className="grid grid-cols-8 gap-2 items-center">
              <div className="text-sm font-medium">{cohort.joinWeek}</div>
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  {cohort.newMembers}
                </Badge>
              </div>
              {Object.values(cohort.retention).map((retention, retIndex) => (
                <div key={retIndex} className="text-center">
                  <div
                    className={cn(
                      "w-full h-8 rounded flex items-center justify-center text-xs font-medium text-white",
                      getRetentionColor(retention),
                    )}
                  >
                    {retention ? `${retention}%` : "—"}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
            <span>Lower retention</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-red-500/60 rounded"></div>
              <div className="w-4 h-4 bg-orange-500/60 rounded"></div>
              <div className="w-4 h-4 bg-yellow-500/60 rounded"></div>
              <div className="w-4 h-4 bg-green-500/60 rounded"></div>
              <div className="w-4 h-4 bg-green-500/80 rounded"></div>
            </div>
            <span>Higher retention</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
