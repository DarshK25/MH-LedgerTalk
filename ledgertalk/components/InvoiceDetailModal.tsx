'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Printer, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InvoiceDetailProps {
  invoice: any;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceDetailModal({ invoice, isOpen, onClose }: InvoiceDetailProps) {
  const [isExporting, setIsExporting] = useState(false);

  if (!invoice) return null;

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const response = await fetch(`/api/invoices/${invoice.id}/pdf`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const items = invoice.items || [];
  const subtotal = items.reduce((sum: number, item: any) => {
    const price = item.rate || item.price || 0;
    const quantity = item.quantity || 0;
    return sum + (quantity * price);
  }, 0);
  const gstAmount = parseFloat(invoice.gstTotal || invoice.gstAmount || '0');
  const total = parseFloat(invoice.total || invoice.amount || '0');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Invoice Details - {invoice.invoiceNumber}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button 
                size="sm" 
                onClick={handleExportPDF}
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4" id="invoice-content">
          {/* Invoice Header */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">INVOICE</h2>
                <p className="text-muted-foreground mt-1">#{invoice.invoiceNumber}</p>
              </div>
              <Badge variant={
                invoice.status === 'paid' ? 'success' : 
                invoice.status === 'sent' ? 'default' : 
                invoice.status === 'draft' ? 'secondary' : 'destructive'
              } className="capitalize">
                {invoice.status}
              </Badge>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Invoice Date</p>
              <p className="text-base mt-1">{new Date(invoice.date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Due Date</p>
              <p className="text-base mt-1">{new Date(invoice.dueDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}</p>
            </div>
          </div>

          {/* Client Info */}
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bill To</p>
            <p className="text-lg font-semibold mt-1">{invoice.customerName}</p>
          </div>

          {/* Items Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Description</th>
                  <th className="text-right p-3 font-medium">Quantity</th>
                  <th className="text-right p-3 font-medium">Price</th>
                  <th className="text-right p-3 font-medium">GST</th>
                  <th className="text-right p-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? items.map((item: any, index: number) => {
                  const price = item.rate || item.price || 0;
                  const quantity = item.quantity || 0;
                  const itemAmount = quantity * price;
                  const itemGst = itemAmount * (item.gstRate || 0) / 100;
                  return (
                    <tr key={index} className="border-t">
                      <td className="p-3">{item.description || 'Services'}</td>
                      <td className="text-right p-3">{quantity}</td>
                      <td className="text-right p-3">₹{price.toLocaleString('en-IN')}</td>
                      <td className="text-right p-3">{item.gstRate || 0}%</td>
                      <td className="text-right p-3">₹{itemAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  );
                }) : (
                  <tr className="border-t">
                    <td className="p-3">Services</td>
                    <td className="text-right p-3">1</td>
                    <td className="text-right p-3">₹{subtotal.toLocaleString('en-IN')}</td>
                    <td className="text-right p-3">-</td>
                    <td className="text-right p-3">₹{subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80 space-y-2">
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-muted-foreground">GST:</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          {invoice.notes && (
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
              <p className="text-sm">{invoice.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
