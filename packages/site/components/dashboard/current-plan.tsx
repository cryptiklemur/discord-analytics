"use client";

import {
  AlertCircle,
  Calendar,
  CreditCard,
  Crown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const currentPlan = {
  name: "Personal",
  price: 10,
  billing: "monthly",
  nextBilling: "2024-02-15",
  status: "active",
  servers: 2,
  maxServers: 3,
  dataRetention: "7 days",
  features: ["Basic Analytics", "7-day Data Retention", "Email Support"],
};

const usage = {
  servers: { current: 2, limit: 3 },
  apiCalls: { current: 1247, limit: 5000 },
  dataPoints: { current: 45000, limit: 100000 },
  reports: { current: 3, limit: 10 },
};

export function CurrentPlan() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="font-inter text-xl flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            Current Plan
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Your subscription details and usage
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
          {currentPlan.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Overview */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-inter font-bold text-lg">
                {currentPlan.name} Plan
              </h3>
              <p className="text-sm text-muted-foreground">
                ${currentPlan.price}/{currentPlan.billing} • Next billing:{" "}
                {currentPlan.nextBilling}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${currentPlan.price}</div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>
        </div>

        {/* Usage Metrics */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Usage This Month</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Connected Servers</span>
                <span className="font-medium">
                  {usage.servers.current} / {usage.servers.limit}
                </span>
              </div>
              <Progress
                value={(usage.servers.current / usage.servers.limit) * 100}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Calls</span>
                <span className="font-medium">
                  {usage.apiCalls.current.toLocaleString()} /{" "}
                  {usage.apiCalls.limit.toLocaleString()}
                </span>
              </div>
              <Progress
                value={(usage.apiCalls.current / usage.apiCalls.limit) * 100}
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Data Points</span>
                <span className="font-medium">
                  {usage.dataPoints.current.toLocaleString()} /{" "}
                  {usage.dataPoints.limit.toLocaleString()}
                </span>
              </div>
              <Progress
                value={
                  (usage.dataPoints.current / usage.dataPoints.limit) * 100
                }
                className="h-2"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reports Generated</span>
                <span className="font-medium">
                  {usage.reports.current} / {usage.reports.limit}
                </span>
              </div>
              <Progress
                value={(usage.reports.current / usage.reports.limit) * 100}
                className="h-2"
              />
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Included Features</h4>
          <div className="grid grid-cols-1 gap-2">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border/50">
          <Button className="flex-1 gap-2">
            <TrendingUp className="w-4 h-4" />
            Upgrade Plan
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Manage Billing
          </Button>
        </div>

        {/* Upgrade Prompt */}
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-500">
                Approaching Limits
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                You're using{" "}
                {Math.round(
                  (usage.dataPoints.current / usage.dataPoints.limit) * 100,
                )}
                % of your data points. Consider upgrading to avoid service
                interruption.
              </p>
              <Button size="sm" className="mt-3 gap-2">
                <Zap className="w-4 h-4" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
