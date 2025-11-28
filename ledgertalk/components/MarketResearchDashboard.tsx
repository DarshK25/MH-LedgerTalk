'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';

interface MarketResearchDashboardProps {
  businessId: number;
  data: any;
  onRefresh: () => void;
}

export function MarketResearchDashboard({ businessId, data, onRefresh }: MarketResearchDashboardProps) {
  const metrics = data?.metrics || {};
  const trends = data?.trends || [];
  const insights = data?.insights || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">🔍 Market Research Intelligence</h2>
          <p className="text-muted-foreground">AI-powered market analysis & growth opportunities</p>
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
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{metrics.revenueGrowth || 0}%</div>
            <p className="text-xs text-muted-foreground">vs last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.marketShare || 0}%</div>
            <p className="text-xs text-muted-foreground">Estimated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.opportunityScore || 0}/100</div>
            <p className="text-xs text-muted-foreground">Potential score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitive Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.competitiveRank || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">In your sector</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Pattern Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trends.map((trend: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${trend.direction === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <div className="font-medium">{trend.category}</div>
                    <div className="text-sm text-muted-foreground">{trend.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{trend.amount.toLocaleString()}</div>
                  <div className={`text-xs flex items-center gap-1 ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className="h-3 w-3" />
                    {trend.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>🤖 AI Market Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight: any, i: number) => (
              <div key={i} className={`p-4 border rounded-lg ${
                insight.priority === 'high' ? 'border-blue-500 bg-blue-50' :
                insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-gray-500 bg-gray-50'
              }`}>
                <div className="flex items-start gap-3">
                  {insight.priority === 'high' && <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />}
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
