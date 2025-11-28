'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppIcon from '@/components/ui/AppIcon';

interface SidebarProps {
  isCollapsed?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, isOpen, onClose }) => {
  const pathname = usePathname();

  const intelligencePages = [
    { name: 'Finance Intelligence', href: '/finance-intelligence', icon: 'SparklesIcon' },
    { name: 'Sales & CRM', href: '/sales-crm', icon: 'UsersIcon' },
    { name: 'Market Research', href: '/market-research', icon: 'ChartBarIcon' },
  ];

  const operationsPages = [
    { name: 'Dashboard', href: '/dashboard', icon: 'ChartBarIcon' },
    { name: 'Transactions', href: '/transactions', icon: 'BanknotesIcon' },
    { name: 'Invoices', href: '/invoices', icon: 'DocumentTextIcon' },
    { name: 'Clients', href: '/clients', icon: 'UsersIcon' },
    { name: 'Documents', href: '/documents', icon: 'DocumentTextIcon' },
  ];

  const compliancePages = [
    { name: 'Compliance', href: '/compliance', icon: 'ShieldCheckIcon' },
    { name: 'TDS', href: '/tds', icon: 'ReceiptPercentIcon' },
  ];

  const renderNavSection = (items: typeof intelligencePages, showSeparator: boolean = false) => (
    <>
      {showSeparator && <div className="my-2 border-t border-border"></div>}
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md transition-colors
              ${isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }
            `}
          >
            <AppIcon name={item.icon} size={20} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 bottom-0 left-0 z-40 bg-background border-r border-border transition-all duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-72'}
      `}>
        <nav className="p-4 space-y-1">
          {renderNavSection(intelligencePages, false)}
          {renderNavSection(operationsPages, true)}
          {renderNavSection(compliancePages, true)}
          
          <div className="my-2 border-t border-border"></div>
          <Link
            href="/business-settings"
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md transition-colors
              ${pathname === '/business-settings'
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }
            `}
          >
            <AppIcon name="Cog6ToothIcon" size={20} />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
