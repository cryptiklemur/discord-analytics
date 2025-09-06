"use client";

import { Calendar, CreditCard, Download, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const billingHistory = [
  {
    id: "inv_001",
    date: "2024-01-15",
    amount: 10.0,
    status: "paid",
    plan: "Personal",
    period: "Jan 15 - Feb 15, 2024",
  },
  {
    id: "inv_002",
    date: "2023-12-15",
    amount: 10.0,
    status: "paid",
    plan: "Personal",
    period: "Dec 15 - Jan 15, 2024",
  },
  {
    id: "inv_003",
    date: "2023-11-15",
    amount: 10.0,
    status: "paid",
    plan: "Personal",
    period: "Nov 15 - Dec 15, 2023",
  },
  {
    id: "inv_004",
    date: "2023-10-15",
    amount: 10.0,
    status: "paid",
    plan: "Personal",
    period: "Oct 15 - Nov 15, 2023",
  },
];

const paymentMethod = {
  type: "card",
  last4: "4242",
  brand: "Visa",
  expiry: "12/25",
};

export function BillingHistory() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="font-inter text-lg flex items-center gap-2">
            <Receipt className="w-5 h-5 text-green-500" />
            Billing History
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Recent invoices and payments
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method */}
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm">Payment Method</h4>
            <Button variant="ghost" size="sm">
              Update
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <div className="font-medium text-sm">
                {paymentMethod.brand} •••• {paymentMethod.last4}
              </div>
              <div className="text-xs text-muted-foreground">
                Expires {paymentMethod.expiry}
              </div>
            </div>
          </div>
        </div>

        {/* Next Billing */}
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-sm text-blue-500">
              Next Billing
            </span>
          </div>
          <div className="text-sm">February 15, 2024</div>
          <div className="text-xs text-muted-foreground">
            $10.00 for Personal plan
          </div>
        </div>

        {/* Invoice History */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Invoices</h4>
          <div className="space-y-2">
            {billingHistory.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      ${invoice.amount.toFixed(2)}
                    </span>
                    <Badge
                      variant={
                        invoice.status === "paid" ? "default" : "destructive"
                      }
                      className="text-xs"
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {invoice.period}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-4 border-t border-border/50">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Download All Invoices
          </Button>
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <CreditCard className="w-4 h-4" />
            Update Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
