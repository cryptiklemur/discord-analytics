import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ServerList } from "@/components/dashboard/server-list";
import { ServerSettings } from "@/components/dashboard/server-settings";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServersPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="p-6 space-y-8 max-w-7xl">
          <div className="space-y-6">
            <div>
              <h1 className="font-inter text-2xl font-bold text-foreground mb-2">
                Server Management
              </h1>
              <p className="text-muted-foreground">
                Manage your connected Discord servers and analytics settings
              </p>
            </div>

            <Suspense fallback={<ServerListSkeleton />}>
              <ServerList />
            </Suspense>
          </div>

          <div className="space-y-6">
            <h2 className="font-inter text-xl font-semibold text-foreground">
              Server Configuration
            </h2>

            <Suspense fallback={<ServerSettingsSkeleton />}>
              <ServerSettings />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

function ServerListSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ServerSettingsSkeleton() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  );
}
