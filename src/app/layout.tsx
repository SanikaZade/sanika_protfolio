import type { Metadata } from 'next';
import './globals.css';
import CursorTrail from '../components/CursorTrail';

export const metadata: Metadata = {
  title: 'Sanika Zade — AI & ML Engineer',
  description: 'B.Tech AI & ML · Data Analyst · ML Engineer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
