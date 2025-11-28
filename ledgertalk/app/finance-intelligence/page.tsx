'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { FinanceIntelligenceDashboard } from '@/components/FinanceIntelligenceDashboard';
import { toast } from 'sonner';

export default function FinanceIntelligencePage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [businessId, setBusinessId] = useState<number>(1);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error(error);
      toast.error("Failed to initialize");
    } finally {
      setLoading(false);
    }
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

      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        } pt-16`}>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <FinanceIntelligenceDashboard businessId={businessId} />
        </div>
      </main>
    </div>
  );
}
