'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus, Menu, X, ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = useRouter();
  const taps = useRef<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoTap = () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < 5000), now];
    if (taps.current.length >= 7) {
      taps.current = [];
      router.push('/admin');
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <button type="button" className="brand hidden-admin-trigger" onClick={handleLogoTap} aria-label="فريق أبناء الأرض">
          <span className="logo-wrap">
            <Image src="/logo.png" alt="شعار فريق أبناء الأرض" width={54} height={54} />
          </span>
          <span>أبناء الأرض</span>
        </button>

        {/* روابط الشاشات الكبيرة */}
        <nav className="links desktop-links">
          <Link href="/">الرئيسية</Link>
          <Link href="/volunteers">المتطوعون</Link>
          <Link href="/blog">الأعمال والمدونة</Link>
          <Link href="/projects">قيد التنفيذ</Link>
          <Link href="/impact">الإحصائيات</Link>
          <Link href="/verify">التحقق من الشهادات</Link>
          <Link href="/transparency">الشفافية</Link>
        </nav>

        {/* أزرار التحكم */}
        <div className="nav-actions">
          <ThemeToggle />
          <Link className="btn secondary volunteer-login-btn desktop-only" href="/volunteer-login">
            <LogIn size={18} /> دخول المتطوعين
          </Link>
          <Link className="btn desktop-only" href="/join">
            <UserPlus size={18} /> انضم إلينا
          </Link>
          
          {/* زر الهامبرغر للموبايل */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل المنزلقة */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={closeMenu}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-head">
              <span className="logo-wrap-sm">
                <Image src="/logo.png" alt="Logo" width={38} height={38} />
              </span>
              <strong>أبناء الأرض</strong>
              <button className="close-btn" onClick={closeMenu} aria-label="إغلاق">
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-drawer-links">
              <Link href="/" onClick={closeMenu}>الرئيسية</Link>
              <Link href="/volunteers" onClick={closeMenu}>دليل المتطوعين</Link>
              <Link href="/blog" onClick={closeMenu}>الأعمال والمبادرات</Link>
              <Link href="/projects" onClick={closeMenu}>مشاريع قيد التنفيذ</Link>
              <Link href="/impact" onClick={closeMenu}>إحصائيات الأثر</Link>
              <Link href="/verify" onClick={closeMenu} className="highlight-link">
                <ShieldCheck size={18} /> التحقق من الشهادات
              </Link>
              <Link href="/transparency" onClick={closeMenu}>الشفافية والحوكمة</Link>
            </nav>

            <div className="mobile-drawer-actions">
              <Link className="btn secondary" href="/volunteer-login" onClick={closeMenu}>
                <LogIn size={18} /> دخول المتطوعين
              </Link>
              <Link className="btn yellow" href="/join" onClick={closeMenu}>
                <UserPlus size={18} /> انضم إلينا
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
