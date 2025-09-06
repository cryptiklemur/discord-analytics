"use client";

import { Building, Check, Crown, Rocket, X, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Personal",
    price: 10,
    description: "Perfect for small communities",
    icon: Crown,
    color: "blue",
    current: true,
    features: {
      servers: "3 servers",
      retention: "7 days",
      analytics: "Basic analytics",
      support: "Email support",
      api: false,
      webhooks: false,
      whiteLabel: false,
      customReports: false,
      prioritySupport: false,
      multiUser: false,
    },
    limits: {
      dataPoints: "100K/month",
      apiCalls: "5K/month",
      reports: "10/month",
    },
  },
  {
    name: "Starter",
    price: 29,
    description: "For growing Discord communities",
    icon: Zap,
    color: "green",
    popular: true,
    features: {
      servers: "10 servers",
      retention: "30 days",
      analytics: "Advanced analytics",
      support: "Priority email support",
      api: true,
      webhooks: false,
      whiteLabel: false,
      customReports: true,
      prioritySupport: false,
      multiUser: false,
    },
    limits: {
      dataPoints: "500K/month",
      apiCalls: "25K/month",
      reports: "50/month",
    },
  },
  {
    name: "Growth",
    price: 79,
    description: "For serious community builders",
    icon: Rocket,
    color: "purple",
    features: {
      servers: "50 servers",
      retention: "1 year",
      analytics: "Premium analytics",
      support: "Priority support + chat",
      api: true,
      webhooks: true,
      whiteLabel: false,
      customReports: true,
      prioritySupport: true,
      multiUser: true,
    },
    limits: {
      dataPoints: "2M/month",
      apiCalls: "100K/month",
      reports: "Unlimited",
    },
  },
  {
    name: "Professional",
    price: 149,
    description: "For businesses and agencies",
    icon: Building,
    color: "orange",
    enterprise: true,
    features: {
      servers: "Unlimited servers",
      retention: "Unlimited",
      analytics: "Enterprise analytics",
      support: "Dedicated support manager",
      api: true,
      webhooks: true,
      whiteLabel: true,
      customReports: true,
      prioritySupport: true,
      multiUser: true,
    },
    limits: {
      dataPoints: "Unlimited",
      apiCalls: "Unlimited",
      reports: "Unlimited",
    },
  },
];

const colorMap = {
  blue: "border-blue-500/50 bg-blue-500/5",
  green: "border-green-500/50 bg-green-500/5",
  purple: "border-purple-500/50 bg-purple-500/5",
  orange: "border-orange-500/50 bg-orange-500/5",
};

const iconColorMap = {
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
};

export function PlanComparison() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => {
        const Icon = plan.icon;
        return (
          <Card
            key={plan.name}
            className={cn(
              "border-border/50 bg-card/50 backdrop-blur-sm relative",
              plan.popular && "ring-2 ring-green-500/50",
              plan.current && "ring-2 ring-blue-500/50",
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500 text-white">Most Popular</Badge>
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Current Plan</Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3",
                  colorMap[plan.color as keyof typeof colorMap],
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    iconColorMap[plan.color as keyof typeof iconColorMap],
                  )}
                />
              </div>
              <CardTitle className="font-inter text-xl">{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div className="pt-2">
                <div className="text-3xl font-bold">${plan.price}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Core Features */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Servers</span>
                  <span className="font-medium">{plan.features.servers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Data Retention</span>
                  <span className="font-medium">{plan.features.retention}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Analytics</span>
                  <span className="font-medium">{plan.features.analytics}</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-3 space-y-2">
                <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                  Usage Limits
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Data Points</span>
                    <span className="font-medium">
                      {plan.limits.dataPoints}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Calls</span>
                    <span className="font-medium">{plan.limits.apiCalls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reports</span>
                    <span className="font-medium">{plan.limits.reports}</span>
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="border-t border-border/50 pt-3 space-y-2">
                <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                  Features
                </h4>
                <div className="space-y-2">
                  {[
                    { key: "api", label: "API Access" },
                    { key: "webhooks", label: "Webhooks" },
                    { key: "customReports", label: "Custom Reports" },
                    { key: "whiteLabel", label: "White Label" },
                    { key: "multiUser", label: "Multi-User Access" },
                    { key: "prioritySupport", label: "Priority Support" },
                  ].map((feature) => (
                    <div
                      key={feature.key}
                      className="flex items-center gap-2 text-sm"
                    >
                      {plan.features[
                        feature.key as keyof typeof plan.features
                      ] ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span
                        className={
                          plan.features[
                            feature.key as keyof typeof plan.features
                          ]
                            ? ""
                            : "text-muted-foreground"
                        }
                      >
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                {plan.current ? (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full">
                    {plan.enterprise ? "Contact Sales" : "Upgrade"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
