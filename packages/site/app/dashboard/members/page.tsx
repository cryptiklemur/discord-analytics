import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { MemberEngagementFunnel } from "@/components/dashboard/member-engagement-funnel";
import { MemberGrowthChart } from "@/components/dashboard/member-growth-chart";
import { MemberRetentionCohort } from "@/components/dashboard/member-retention-cohort";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MembersPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="p-6 space-y-8 max-w-7xl">
          <div className="space-y-6">
            <div>
              <h1 className="font-inter text-2xl font-bold text-foreground mb-2">
                Member Analytics
              </h1>
              <p className="text-muted-foreground">
                Deep insights into member growth, retention, and engagement
                patterns
              </p>
            </div>

            <Suspense fallback={<ChartSkeleton />}>
              <MemberGrowthChart />
            </Suspense>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Suspense fallback={<ChartSkeleton />}>
              <MemberRetentionCohort />
            </Suspense>
            <Suspense fallback={<ChartSkeleton />}>
              <MemberEngagementFunnel />
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
