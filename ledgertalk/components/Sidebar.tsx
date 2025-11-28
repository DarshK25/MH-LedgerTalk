import Link from "next/link";

export default function Sidebar() {
  return (
    <nav style={{ width: "200px", padding: "20px", borderRight: "1px solid #ccc" }}>
      <h2>Navigation</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/dashboard/financial-intelligence">Financial Intelligence</Link>
        </li>
        <li>
          <Link href="/dashboard/sales-crm-intelligence">Sales & CRM Intelligence</Link>
        </li>
        <li>
          <Link href="/dashboard/market-research-intelligence">Market Research Intelligence</Link>
        </li>
        <li>
          <Link href="/dashboard/ai-assistant">AI Assistant</Link>
        </li>
        <li>
          <Link href="/dashboard/invoice">Invoice</Link>
        </li>
        <li>
          <Link href="/dashboard/transactions">Transactions</Link>
        </li>
      </ul>
    </nav>
  );
}
