'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface SalesCRMDashboardProps {
  businessId: number;
  data: any;
  onRefresh: () => void;
}

export function SalesCRMDashboard({ businessId, data, onRefresh }: SalesCRMDashboardProps) {
  const metrics = data?.metrics || {};
  const clients = data?.clients || [];
  const insights = data?.insights || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">📊 Sales & CRM Intelligence</h2>
          <p className="text-muted-foreground">AI-powered client relationship management</p>
        </div>
        <Button onClick={onRefresh} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalClients || 0}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{metrics.activeClients || 0}</div>
            <p className="text-xs text-muted-foreground">Last 90 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.atRiskClients || 0}</div>
            <p className="text-xs text-muted-foreground">No activity 90+ days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Client Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(metrics.avgClientValue || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Client Health Score */}
      <Card>
        <CardHeader>
          <CardTitle>Client Relationship Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Health Score</span>
                <span className="text-2xl font-bold text-green-600">{metrics.healthScore || 0}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${metrics.healthScore || 0}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Payment Reliability</div>
                <div className="font-semibold">{metrics.paymentReliability || 0}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Engagement Rate</div>
                <div className="font-semibold">{metrics.engagementRate || 0}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">Retention Rate</div>
                <div className="font-semibold">{metrics.retentionRate || 0}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Clients by Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>Top Clients by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clients.slice(0, 5).map((client: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">{client.invoiceCount} invoices</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{client.totalRevenue.toLocaleString()}</div>
                  {client.trend === 'up' ? (
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {client.growth}%
                    </div>
                  ) : (
                    <div className="text-xs text-red-600 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      {client.growth}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight: any, i: number) => (
              <div key={i} className={`p-4 border rounded-lg ${
                insight.priority === 'high' ? 'border-red-500 bg-red-50' :
                insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start gap-3">
                  {insight.priority === 'high' && <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />}
                  <div className="flex-1">
                    <div className="font-semibold">{insight.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">{insight.message}</div>
                    {insight.action && (
                      <Button variant="link" className="p-0 h-auto mt-2">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
