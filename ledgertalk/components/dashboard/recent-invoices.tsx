'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Invoice {
  id: number;
  invoiceNumber: string;
  customerName: string;
  amount: string;
  status: string;
}

interface RecentInvoicesProps {
  invoices: Invoice[];
}

export function RecentInvoices({ invoices }: RecentInvoicesProps) {
  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No recent invoices</p>
        <p className="text-sm mt-2">Create your first invoice to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {invoice.customerName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">{invoice.customerName}</p>
            <p className="text-sm text-muted-foreground">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <div className="font-medium">₹{invoice.amount}</div>
            <div className={`text-xs ${
              invoice.status === 'paid' ? 'text-success' : 
              invoice.status === 'sent' ? 'text-warning' : 
              'text-muted-foreground'
            }`}>
              {invoice.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
