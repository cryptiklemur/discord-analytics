"use client";

import { Bell, Database, Info, Lock, Settings, Shield } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const currentServer = {
  id: "1",
  name: "Gaming Community",
  plan: "Growth",
};

export function ServerSettings() {
  const [settings, setSettings] = useState({
    tracking: {
      messages: true,
      voiceActivity: true,
      memberJoins: true,
      memberLeaves: true,
      reactions: false,
      channelActivity: true,
    },
    privacy: {
      anonymizeUsers: false,
      excludeAdmins: true,
      excludeBots: true,
      dataRetention: "1year",
    },
    notifications: {
      dailyReports: true,
      weeklyReports: false,
      alertThresholds: true,
      memberMilestones: true,
    },
    advanced: {
      apiAccess: false,
      webhooks: false,
      customEvents: false,
    },
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const isPremiumFeature = (feature: string) => {
    const premiumFeatures = [
      "reactions",
      "apiAccess",
      "webhooks",
      "customEvents",
    ];
    return (
      premiumFeatures.includes(feature) && currentServer.plan === "Personal"
    );
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-inter text-xl flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-500" />
          Server Configuration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure analytics tracking and privacy settings for{" "}
          <strong>{currentServer.name}</strong>
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tracking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tracking" className="gap-2">
              <Database className="w-4 h-4" />
              Tracking
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-2">
              <Lock className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-4">
                Data Tracking Settings
              </h3>
              <div className="space-y-4">
                {Object.entries(settings.tracking).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="space-y-1">
                      <Label className="capitalize font-medium">
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {getTrackingDescription(key)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isPremiumFeature(key) && (
                        <Badge variant="outline" className="text-xs">
                          Premium
                        </Badge>
                      )}
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) =>
                          updateSetting("tracking", key, checked)
                        }
                        disabled={isPremiumFeature(key)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-4">
                Privacy & Data Protection
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <Label className="font-medium">Anonymize User Data</Label>
                    <p className="text-xs text-muted-foreground">
                      Replace usernames with anonymous IDs in analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.anonymizeUsers}
                    onCheckedChange={(checked) =>
                      updateSetting("privacy", "anonymizeUsers", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <Label className="font-medium">
                      Exclude Administrators
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Don't track admin activity in analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.excludeAdmins}
                    onCheckedChange={(checked) =>
                      updateSetting("privacy", "excludeAdmins", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <Label className="font-medium">Exclude Bots</Label>
                    <p className="text-xs text-muted-foreground">
                      Filter out bot activity from analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.excludeBots}
                    onCheckedChange={(checked) =>
                      updateSetting("privacy", "excludeBots", checked)
                    }
                  />
                </div>

                <div className="p-3 bg-muted/30 rounded-lg">
                  <Label className="font-medium mb-2 block">
                    Data Retention Period
                  </Label>
                  <Select
                    value={settings.privacy.dataRetention}
                    onValueChange={(value) =>
                      updateSetting("privacy", "dataRetention", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 days</SelectItem>
                      <SelectItem value="30days">30 days</SelectItem>
                      <SelectItem value="90days">90 days</SelectItem>
                      <SelectItem value="1year">1 year</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    How long to keep historical analytics data
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="space-y-1">
                      <Label className="capitalize font-medium">
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {getNotificationDescription(key)}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        updateSetting("notifications", key, checked)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-4">Advanced Features</h3>
              <div className="space-y-4">
                {Object.entries(settings.advanced).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label className="capitalize font-medium">
                          {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </Label>
                        {isPremiumFeature(key) && (
                          <Badge variant="outline" className="text-xs">
                            Growth+
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {getAdvancedDescription(key)}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        updateSetting("advanced", key, checked)
                      }
                      disabled={isPremiumFeature(key)}
                    />
                  </div>
                ))}
              </div>

              {currentServer.plan === "Personal" && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-500">
                        Upgrade for Advanced Features
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Unlock API access, webhooks, and custom event tracking
                        with Growth or Professional plans.
                      </p>
                      <Button size="sm" className="mt-3">
                        Upgrade Plan
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getTrackingDescription(key: string): string {
  const descriptions = {
    messages: "Track message count and content analytics",
    voiceActivity: "Monitor voice channel usage and duration",
    memberJoins: "Record when new members join the server",
    memberLeaves: "Track member departures and churn",
    reactions: "Analyze emoji reactions and engagement",
    channelActivity: "Monitor activity across all channels",
  };
  return descriptions[key as keyof typeof descriptions] || "";
}

function getNotificationDescription(key: string): string {
  const descriptions = {
    dailyReports: "Receive daily analytics summaries via email",
    weeklyReports: "Get comprehensive weekly reports",
    alertThresholds: "Notifications when metrics exceed thresholds",
    memberMilestones: "Alerts for member count milestones",
  };
  return descriptions[key as keyof typeof descriptions] || "";
}

function getAdvancedDescription(key: string): string {
  const descriptions = {
    apiAccess: "Enable REST API access for custom integrations",
    webhooks: "Send real-time data to external services",
    customEvents: "Track custom events and metrics",
  };
  return descriptions[key as keyof typeof descriptions] || "";
}
