"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Send } from "lucide-react";
import { toast } from "sonner";

interface HighRiskCustomer {
  id: number;
  name: string;
  email: string;
  overdueAmount: number;
  overdueCount: number;
  avgDelayDays: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export function HighRiskCustomers({ businessId }: { businessId: number }) {
  const [customers, setCustomers] = useState<HighRiskCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingReminder, setSendingReminder] = useState<number | null>(null);

  useEffect(() => {
    fetchHighRiskCustomers();
  }, [businessId]);

  const fetchHighRiskCustomers = async () => {
    try {
      const res = await fetch(`/api/sales/payment-risk?businessId=${businessId}`);
      if (res.ok) {
        const data = await res.json();
        // Get top 5 high-risk customers
        const highRisk = data.clients
          .filter((c: any) => c.riskLevel === 'high')
          .slice(0, 5);
        setCustomers(highRisk);
      }
    } catch (error) {
      console.error('Failed to fetch high-risk customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendReminder = async (customerName: string, customerId: number) => {
    setSendingReminder(customerId);
    try {
      const res = await fetch('/api/voice-commands/send-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId, clientName: customerName }),
      });
      
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else {
        toast.error('Failed to send reminder');
      }
    } catch (error) {
      toast.error('Failed to send reminder');
    } finally {
      setSendingReminder(null);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle>High-Risk Customers</CardTitle>
        </div>
        <CardDescription>
          Customers with overdue payments or payment delays
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : customers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-green-500" />
            <p>No high-risk customers! All payments are on track.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{customer.name}</p>
                    <Badge className={getRiskColor(customer.riskLevel)}>
                      {customer.riskLevel}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Overdue: ₹{customer.overdueAmount.toLocaleString()} ({customer.overdueCount} invoices)</p>
                    <p>Avg delay: {customer.avgDelayDays} days</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => sendReminder(customer.name, customer.id)}
                  disabled={sendingReminder === customer.id}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {sendingReminder === customer.id ? 'Sending...' : 'Send Reminder'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
