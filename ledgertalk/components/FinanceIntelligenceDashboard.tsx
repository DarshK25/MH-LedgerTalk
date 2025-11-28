'use client';

/**
 * ===================================================================
 * FINANCE INTELLIGENCE DASHBOARD - Professional UI Component
 * ===================================================================
 * Real-time financial intelligence display with automated insights
 * Built with: React 19, Tailwind CSS 4, Radix UI, Recharts
 * ===================================================================
 */

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  FileText,
  PieChart,
  BarChart3,
  Loader2,
  RefreshCw,
  Download,
  Target,
  Activity
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface FinanceMetrics {
  healthScore: number;
  healthRating: string;
  totalRevenue: number;
  netCashflow: number;
  gstPayable: number;
  tdsPayable: number;
  grossProfit: number;
  netProfit: number;
  grossMargin: number;
  netMargin: number;
}

interface BudgetItem {
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: 'under' | 'on-track' | 'over';
}

interface Insight {
  id: string;
  type: 'alert' | 'suggestion' | 'insight' | 'risk' | 'opportunity';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  action?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const statusColors = {
  under: 'text-green-500',
  'on-track': 'text-blue-500',
  over: 'text-red-500'
};

const priorityColors = {
  critical: 'bg-red-500 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-white',
  low: 'bg-blue-500 text-white'
};

export function FinanceIntelligenceDashboard({ businessId }: { businessId: number }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [metrics, setMetrics] = useState<FinanceMetrics | null>(null);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);

  useEffect(() => {
    fetchFinanceData();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchFinanceData, 60000);
    return () => clearInterval(interval);
  }, [businessId]);

  async function fetchFinanceData() {
    setRefreshing(true);
    try {
      const [metricsRes, budgetRes, insightsRes, ledgerRes] = await Promise.all([
        fetch(`/api/finance-intelligence/metrics?businessId=${businessId}`),
        fetch(`/api/finance-intelligence/budget?businessId=${businessId}`),
        fetch(`/api/finance-intelligence/insights?businessId=${businessId}`),
        fetch(`/api/finance-intelligence/ledger?businessId=${businessId}`)
      ]);

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }
      
      if (budgetRes.ok) {
        const budgetData = await budgetRes.json();
        setBudgets(Array.isArray(budgetData) ? budgetData : []);
      }
      
      if (insightsRes.ok) {
        const insightsData = await insightsRes.json();
        // Handle both array and object responses
        if (Array.isArray(insightsData)) {
          setInsights(insightsData);
        } else if (insightsData.insights && Array.isArray(insightsData.insights)) {
          setInsights(insightsData.insights);
        } else {
          setInsights([]);
        }
      }
      
      if (ledgerRes.ok) {
        const ledgerData = await ledgerRes.json();
        setLedgerEntries(Array.isArray(ledgerData) ? ledgerData : []);
      }
    } catch (error) {
      console.error('Failed to fetch finance data:', error);
      // Set safe defaults on error
      setInsights([]);
      setBudgets([]);
      setLedgerEntries([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading Finance Intelligence...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">🤖 Finance Intelligence Agent</h2>
          <p className="text-muted-foreground">
            Comprehensive financial analysis, monitoring & optimization
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchFinanceData}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Financial Health Score */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Financial Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl font-bold text-primary">
                  {metrics?.healthScore || 0}/100
                </div>
                <Badge className="mt-2" variant={
                  (metrics?.healthScore || 0) >= 80 ? 'default' :
                  (metrics?.healthScore || 0) >= 60 ? 'secondary' : 'destructive'
                }>
                  {metrics?.healthRating || 'Loading...'}
                </Badge>
              </div>
              <div className="text-right space-y-2">
                <div className="text-sm text-muted-foreground">Revenue Health</div>
                <div className="text-sm text-muted-foreground">Cashflow Health</div>
                <div className="text-sm text-muted-foreground">Compliance</div>
              </div>
            </div>
            <Progress value={metrics?.healthScore || 0} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(metrics?.totalRevenue || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 90 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cashflow</CardTitle>
            {(metrics?.netCashflow || 0) >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(metrics?.netCashflow || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ₹{(metrics?.netCashflow || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Current position</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GST Payable</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(metrics?.gstPayable || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit Margin</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(metrics?.netMargin || 0).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Industry: 15-20%</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🤖 Automated Insights & Recommendations</CardTitle>
              <CardDescription>
                AI-powered analysis running every 60 seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {insights.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                      <p>All systems healthy! No critical insights at the moment.</p>
                    </div>
                  ) : (
                    insights.map((insight) => (
                      <div
                        key={insight.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={priorityColors[insight.priority]}>
                                {insight.priority}
                              </Badge>
                              <h4 className="font-semibold">{insight.title}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{insight.message}</p>
                            {insight.actionable && insight.action && (
                              <Button variant="outline" size="sm" className="mt-2">
                                {insight.action}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Analysis Tab */}
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>💰 Budget vs Actual Analysis</CardTitle>
              <CardDescription>Monthly expense tracking & variance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgets.map((budget) => (
                  <div key={budget.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{budget.category}</span>
                      <span className={`text-sm font-semibold ${statusColors[budget.status]}`}>
                        {budget.variancePercent > 0 ? '+' : ''}{budget.variancePercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Progress
                          value={(budget.actual / budget.budgeted) * 100}
                          className="h-2"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-32 text-right">
                        ₹{budget.actual.toLocaleString()} / ₹{budget.budgeted.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {budgets.length > 0 && (
                <div className="mt-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={budgets}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted" />
                      <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profitability Tab */}
        <TabsContent value="profitability" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>📊 Profit & Loss Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Profit:</span>
                  <span className="font-bold text-green-600">
                    ₹{(metrics?.grossProfit || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gross Margin:</span>
                  <span className="font-semibold">{(metrics?.grossMargin || 0).toFixed(1)}%</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-muted-foreground">Net Profit:</span>
                  <span className="font-bold text-blue-600">
                    ₹{(metrics?.netProfit || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Margin:</span>
                  <span className="font-semibold">{(metrics?.netMargin || 0).toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📈 Profit Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RePieChart>
                    <Pie
                      data={[
                        { name: 'Gross Profit', value: metrics?.grossProfit || 0 },
                        { name: 'Expenses', value: (metrics?.grossProfit || 0) - (metrics?.netProfit || 0) }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ledger Tab */}
        <TabsContent value="ledger" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>📚 General Ledger</CardTitle>
                  <CardDescription>Last 30 days transaction history</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {ledgerEntries.slice(0, 20).map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b pb-2 text-sm"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{entry.particular}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right space-x-4">
                        <span className="text-red-600">
                          {entry.debit > 0 ? `₹${entry.debit.toLocaleString()}` : '-'}
                        </span>
                        <span className="text-green-600">
                          {entry.credit > 0 ? `₹${entry.credit.toLocaleString()}` : '-'}
                        </span>
                        <span className="font-semibold w-24 inline-block">
                          ₹{entry.balance.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
