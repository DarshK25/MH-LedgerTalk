'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { MarketResearchDashboard } from '@/components/MarketResearchDashboard';
import { toast } from 'sonner';

export default function MarketResearchPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [businessId, setBusinessId] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setIsHydrated(true);
    initBusiness();
  }, []);

  async function initBusiness() {
    try {
      const initRes = await fetch('/api/init');
      const initData = await initRes.json();
      const bId = initData.business?.id || 1;
      setBusinessId(bId);
      await fetchData(bId);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load market data");
    } finally {
      setLoading(false);
    }
  }

  async function fetchData(bId: number) {
    const res = await fetch(`/api/agents/market?businessId=${bId}`);
    const marketData = await res.json();
    setData(marketData);
  }

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse p-8">
          <div className="h-16 bg-card border border-border mb-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMobileMenu={sidebarOpen}
      />

      <Sidebar
        isCollapsed={sidebarCollapsed}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`}>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <MarketResearchDashboard 
            businessId={businessId} 
            data={data}
            onRefresh={() => fetchData(businessId)}
          />
        </div>
      </main>
    </div>
  );
}
