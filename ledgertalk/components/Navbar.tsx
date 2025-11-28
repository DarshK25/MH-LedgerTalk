'use client';

import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              LedgerTalk
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="#features" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#benefits" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Why Choose Us
            </Link>
            <ThemeToggle />
            <Link href="/dashboard">
              <Button size="sm" className="font-semibold">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
