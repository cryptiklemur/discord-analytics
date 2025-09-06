import { Suspense } from "react";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { ChannelPerformance } from "@/components/dashboard/channel-performance";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { MemberGrowthChart } from "@/components/dashboard/member-growth-chart";
import { MessageAnalytics } from "@/components/dashboard/message-analytics";
import { OverviewMetrics } from "@/components/dashboard/overview-metrics";
import { RealtimeActivity } from "@/components/dashboard/realtime-activity";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="p-6 space-y-8 max-w-7xl">
          <div className="space-y-6">
            <div>
              <h1 className="font-inter text-2xl font-bold text-foreground mb-2">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground">
                Monitor your Discord community's growth and engagement
              </p>
            </div>

            <Suspense fallback={<MetricsSkeleton />}>
              <OverviewMetrics />
            </Suspense>
          </div>

          <div className="space-y-6">
            <h2 className="font-inter text-xl font-semibold text-foreground">
              Community Analytics
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Suspense fallback={<ChartSkeleton />}>
                <MemberGrowthChart />
              </Suspense>
              <Suspense fallback={<ChartSkeleton />}>
                <ActivityHeatmap />
              </Suspense>
            </div>

            <Suspense fallback={<ChartSkeleton />}>
              <MessageAnalytics />
            </Suspense>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Suspense fallback={<ChartSkeleton />}>
                  <ChannelPerformance />
                </Suspense>
              </div>
              <Suspense fallback={<ChartSkeleton />}>
                <RealtimeActivity />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
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
