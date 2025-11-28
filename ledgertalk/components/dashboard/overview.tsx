<<<<<<< HEAD
// Dashboard overview component
export function Overview() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Overview</h3>
            {/* TODO: Implement overview */}
        </div>
    );
=======
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
  { name: 'Aug', revenue: 4200, expenses: 3200 },
  { name: 'Sep', revenue: 3800, expenses: 2900 },
  { name: 'Oct', revenue: 4100, expenses: 3100 },
  { name: 'Nov', revenue: 4500, expenses: 3400 },
  { name: 'Dec', revenue: 5000, expenses: 3600 },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="name" 
          stroke="#64748B"
          fontSize={12}
        />
        <YAxis 
          stroke="#64748B"
          fontSize={12}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            color: '#1E293B'
          }}
          formatter={(value: any) => [`₹${value}`, '']}
        />
        <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#DC2626" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
>>>>>>> main
}
