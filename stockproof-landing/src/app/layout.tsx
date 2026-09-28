import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'StockProof — See the whole trade.', description: 'You see the buy. We see the trade. Explore entry costs, exit availability, and observable risk before you decide.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
