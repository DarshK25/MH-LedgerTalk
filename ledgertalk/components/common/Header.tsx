<<<<<<< HEAD
// Common Header component
export function Header() {
    return (
        <header className="border-b">
            <div className="flex h-16 items-center px-4">
                <h1 className="text-xl font-bold">LedgerTalk</h1>
            </div>
        </header>
    );
}
=======
'use client';

import React from 'react';
import AppIcon from '@/components/ui/AppIcon';

interface HeaderProps {
  onMenuToggle: () => void;
  showMobileMenu: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, showMobileMenu }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-sm z-40 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-md hover:bg-muted transition-colors lg:hidden"
        >
          <AppIcon name={showMobileMenu ? "XMarkIcon" : "MenuIcon"} size={24} />
        </button>
        <div className="font-bold text-xl text-primary">LedgerTalk</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-muted">
          <AppIcon name="BellIcon" size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          US
        </div>
      </div>
    </header>
  );
};

export default Header;
>>>>>>> main
