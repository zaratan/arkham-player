import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import locafFont from 'next/font/local';
import './globals.css';
import NeededCssClasses from '@/styles/NeededCssClasses';

const inter = Inter({ subsets: ['latin'], variable: '--inter' });
const arkhamFont = locafFont({
  src: '../fonts/arkham-icons.otf.ttf',
  variable: '--arkham',
});

const cardFont = locafFont({
  src: '../fonts/cardicons.ttf',
  variable: '--card',
});

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
      <body
        className={`${inter.variable} ${arkhamFont.variable} ${cardFont.variable} font-sans bg-slate-800 text-gray-200`}
      >
        <NeededCssClasses />
        {children}
      </body>
    </html>
  );
}
