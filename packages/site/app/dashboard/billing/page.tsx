import { Suspense } from "react";
import { BillingHistory } from "@/components/dashboard/billing-history";
import { CurrentPlan } from "@/components/dashboard/current-plan";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { PlanComparison } from "@/components/dashboard/plan-comparison";
import { UsageMetrics } from "@/components/dashboard/usage-metrics";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="pl-64">
        <DashboardHeader />
        <main className="p-6 space-y-8 max-w-7xl">
          <div className="space-y-6">
            <div>
              <h1 className="font-inter text-2xl font-bold text-foreground mb-2">
                Billing & Usage
              </h1>
              <p className="text-muted-foreground">
                Manage your subscription and monitor usage across all servers
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Suspense fallback={<BillingSkeleton />}>
                  <CurrentPlan />
                </Suspense>

                <Suspense fallback={<BillingSkeleton />}>
                  <UsageMetrics />
                </Suspense>
              </div>

              <div>
                <Suspense fallback={<BillingSkeleton />}>
                  <BillingHistory />
                </Suspense>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-inter text-xl font-semibold text-foreground">
              Plan Comparison
            </h2>

            <Suspense fallback={<PlanComparisonSkeleton />}>
              <PlanComparison />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

function BillingSkeleton() {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  );
}

function PlanComparisonSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
