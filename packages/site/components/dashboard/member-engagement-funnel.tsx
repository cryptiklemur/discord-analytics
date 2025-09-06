"use client";

import { Crown, Heart, MessageSquare, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const funnelStages = [
  {
    stage: "New Members",
    count: 2847,
    percentage: 100,
    icon: Users,
    color: "bg-blue-500",
    description: "Joined in last 30 days",
  },
  {
    stage: "Active Members",
    count: 1982,
    percentage: 69.6,
    icon: MessageSquare,
    color: "bg-green-500",
    description: "Sent at least 1 message",
  },
  {
    stage: "Engaged Members",
    count: 1247,
    percentage: 43.8,
    icon: Heart,
    color: "bg-purple-500",
    description: "Active 3+ days per week",
  },
  {
    stage: "Champion Members",
    count: 456,
    percentage: 16.0,
    icon: Crown,
    color: "bg-orange-500",
    description: "Top contributors & advocates",
  },
];

export function MemberEngagementFunnel() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-inter text-lg">
          Member Lifecycle Funnel
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Journey from new member to community champion
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelStages.map((stage, index) => {
            const Icon = stage.icon;
            const width = stage.percentage;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${stage.color}/20`}>
                      <Icon
                        className={`w-4 h-4 ${stage.color.replace("bg-", "text-")}`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{stage.stage}</div>
                      <div className="text-xs text-muted-foreground">
                        {stage.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {stage.count.toLocaleString()}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stage.percentage}%
                    </Badge>
                  </div>
                </div>

                {/* Funnel bar */}
                <div className="relative h-8 bg-muted/30 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${stage.color}/80 rounded-lg transition-all duration-500`}
                    style={{ width: `${width}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {stage.count.toLocaleString()} members
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
