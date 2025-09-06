import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ServerSettings } from "@/components/dashboard/server-settings";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="p-6 space-y-8 max-w-7xl">
          <div className="space-y-6">
            <div>
              <h1 className="font-inter text-2xl font-bold text-foreground mb-2">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Configure your analytics preferences and server settings
              </p>
            </div>

            <Suspense fallback={<SettingsSkeleton />}>
              <ServerSettings />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  );
}
