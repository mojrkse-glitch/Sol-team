import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PWARegister from '@/components/PWARegister';
import FloatingSidePanel from '@/components/FloatingSidePanel';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'فريق أبناء الأرض التطوعي | المنصة الأكاديمية والمجتمعية',
  description: 'منصة فريق أبناء الأرض التطوعي لإدارة المتطوعين، المبادرات، وتوثيق ساعات الأثر المجتمعي والأكاديمي.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, title: 'أبناء الأرض', statusBarStyle: 'black-translucent' },
  openGraph: {
    title: 'فريق أبناء الأرض التطوعي',
    description: 'أمل ينمو و أثر يبقى — توثيق رسمي للمبادرات والشهادات التطوعية',
    images: ['/team-banner.jpg']
  }
};

export const viewport: Viewport = { themeColor: '#0b4f3a', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body style={{ fontFamily: 'var(--font-cairo), Arial, sans-serif' }}>
        <PWARegister />
        <Header />
        <FloatingSidePanel />
        {children}
        <Footer />
      </body>
    </html>
  );
}
