"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

interface RevenueData {
  month: string;
  revenue: number;
  paid: number;
  pending: number;
}

export function RevenueTrend({ businessId }: { businessId: number }) {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, [businessId]);

  const fetchRevenueData = async () => {
    try {
      // Fetch last 6 months of data
      const months = [];
      const now = new Date();
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        const res = await fetch(`/api/finance/gst-summary?businessId=${businessId}&period=${period}`);
        if (res.ok) {
          const summary = await res.json();
          months.push({
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            revenue: parseFloat(summary.outwardTaxable) + parseFloat(summary.outwardGST),
            paid: parseFloat(summary.outwardTaxable) * (summary.breakdown.paid / (summary.invoiceCount || 1)),
            pending: parseFloat(summary.outwardTaxable) * (summary.breakdown.pending / (summary.invoiceCount || 1))
          });
        }
      }
      
      setData(months);
    } catch (error) {
      console.error('Failed to fetch revenue data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Revenue Trend</CardTitle>
        </div>
        <CardDescription>Last 6 months revenue overview</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No revenue data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `₹${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Total Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="paid" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Paid"
              />
              <Line 
                type="monotone" 
                dataKey="pending" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                name="Pending"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
