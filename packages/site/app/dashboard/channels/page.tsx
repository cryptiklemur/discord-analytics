import { Suspense } from "react";
import { ChannelPerformance } from "@/components/dashboard/channel-performance";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChannelsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="p-6 space-y-8 max-w-7xl">
          <div className="space-y-6">
            <div>
              <h1 className="font-inter text-2xl font-bold text-foreground mb-2">
                Channel Analytics
              </h1>
              <p className="text-muted-foreground">
                Monitor channel performance, activity patterns, and engagement
                metrics
              </p>
            </div>

            <Suspense fallback={<ChartSkeleton />}>
              <ChannelPerformance />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-64 w-full" />
      </CardContent>
    </Card>
  );
}
