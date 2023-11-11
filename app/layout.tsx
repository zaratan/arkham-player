import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--inter' });

export const metadata: Metadata = {
  title: 'Arkham Player',
  description: 'Try your Arkham deck',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <span className="text-seeker text-survivor text-guardian text-mystic text-rogue text-neutral" />
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
}
