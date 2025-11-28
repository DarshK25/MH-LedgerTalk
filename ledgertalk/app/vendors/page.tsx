"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";

const vendors = [
  { id: 1, name: "Tech Solutions Pvt Ltd", gstin: "29AAAAA0000A1Z5", type: "Regular", msme: false, outstanding: 50000, dueDays: 15 },
  { id: 2, name: "Small Parts Traders", gstin: "29BBBBB1111B1Z6", type: "Composition", msme: true, outstanding: 12000, dueDays: 40 },
  { id: 3, name: "Office Needs", gstin: "29CCCCC2222C1Z7", type: "Regular", msme: true, outstanding: 5000, dueDays: 5 },
  { id: 4, name: "Global Services", gstin: "29DDDDD3333D1Z8", type: "Regular", msme: false, outstanding: 150000, dueDays: 60 },
];

export default function VendorsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vendor Management</h2>
          <p className="text-muted-foreground">Track MSME status and payment deadlines (45-day rule).</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,17,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">MSME Due (Critical)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹12,000</div>
            <p className="text-xs text-muted-foreground">Approaching 45 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor List</CardTitle>
          <CardDescription>Monitor payment terms and MSME compliance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>GSTIN</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>MSME Status</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Due In (Days)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.gstin}</TableCell>
                  <TableCell>{vendor.type}</TableCell>
                  <TableCell>
                    {vendor.msme ? (
                        <Badge className="bg-blue-500">Registered</Badge>
                    ) : (
                        <Badge variant="secondary">N/A</Badge>
                    )}
                  </TableCell>
                  <TableCell>₹{vendor.outstanding.toLocaleString()}</TableCell>
                  <TableCell className={vendor.msme && vendor.dueDays > 40 ? "text-red-600 font-bold" : ""}>
                    {vendor.dueDays} days
                  </TableCell>
                  <TableCell>
                    {vendor.msme && vendor.dueDays > 40 ? (
                        <div className="flex items-center text-red-600">
                            <AlertTriangle className="mr-2 h-4 w-4" /> 
                            Critical
                        </div>
                    ) : (
                        <span className="text-green-600">Safe</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
