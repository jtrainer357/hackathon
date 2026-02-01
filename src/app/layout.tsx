import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { NavigationRail } from '@/components/layout/navigation-rail';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { DashboardHeader } from '@/components/layout/dashboard-header';

const akkuratLL = localFont({
  src: [
    {
      path: '../../public/fonts/AkkuratLL-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AkkuratLL-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../public/fonts/AkkuratLL-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AkkuratLL-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/AkkuratLL-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AkkuratLL-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/AkkuratLL-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AkkuratLL-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/AkkuratLL-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AkkuratLL-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tebra Mental Health',
  description: 'AI-powered Mental Health EHR - 80% documentation time reduction',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${akkuratLL.variable} font-sans antialiased`}>
        <NavigationRail />
        <main className="ml-0 md:ml-[80px] flex min-h-screen flex-col transition-all duration-300 ease-in-out pb-24 md:pb-0">
          <DashboardHeader />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
        <BottomNavigation />
      </body>
    </html>
  );
}
