'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link href="/" className="nav-logo">
          <Bell size={32} />
          QuietSpace
        </Link>
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="/#how-it-works" onClick={() => setMenuOpen(false)}>Cara Kerja</a>
          <a href="/#features" onClick={() => setMenuOpen(false)}>Fitur</a>
          <Link href="/explore" onClick={() => setMenuOpen(false)}>Cari Tempat</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>Tentang</Link>
          <Link href="/partners" className="nav-cta" onClick={() => setMenuOpen(false)}>Untuk Mitra</Link>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
