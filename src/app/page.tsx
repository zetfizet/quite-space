'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Coffee, Zap, Star } from 'lucide-react';
import PlaceCard from '@/components/PlaceCard';
import { placesData, featuresData, testimonialsData } from '@/data';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/explore');
    }
  };

  useEffect(() => {
    // Fade in animation logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div>
            <div className="hero-badge">
              <MapPin size={16} /> Platform Ruang Kerja #1 di Surabaya
            </div>
            <h1>Temukan Tempat <span>Tenang</span> untuk Produktif</h1>
            <p>Cari cafe, coworking space, dan perpustakaan terbaik di Surabaya berdasarkan tingkat kebisingan, ambience, dan fasilitas. Cocok untuk mahasiswa, freelancer, dan remote worker.</p>
            <div className="hero-search">
              <input 
                type="text" 
                placeholder="Cari cafe, coworking space di Surabaya..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button onClick={handleSearch}>Cari Tempat</button>
            </div>
            <div className="hero-stats">
              <div className="stat"><div className="stat-number">500+</div><div className="stat-label">Tempat Terdaftar</div></div>
              <div className="stat"><div className="stat-number">10k+</div><div className="stat-label">Review Komunitas</div></div>
              <div className="stat"><div className="stat-number">#1</div><div className="stat-label">Di Surabaya</div></div>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero.png" alt="Orang sedang bekerja produktif di cafe" />
            <div className="hero-float-card card1">
              <div className="float-icon green"><Coffee size={20} color="var(--green-primary)" /></div>
              <div className="float-text">
                <div className="ft-label">Rekomendasi</div>
                <div className="ft-value">Calibre Coffee</div>
              </div>
            </div>
            <div className="hero-float-card card2">
              <div className="float-icon yellow"><Zap size={20} color="var(--yellow)" /></div>
              <div className="float-text">
                <div className="ft-label">Kebisingan</div>
                <div className="ft-value">Sangat Sunyi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-it-works fade-in" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Cara Kerja</div>
            <h2 className="section-title">Temukan Spot Terbaikmu</h2>
            <p className="section-subtitle">Hanya butuh 3 langkah mudah untuk menemukan tempat nugas atau kerja yang paling sesuai dengan gaya produktivitasmu.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card"><div className="step-number">1</div><h3>Cari Lokasi</h3><p>Masukkan nama daerah atau ketikkan tempat spesifik di Surabaya untuk melihat rekomendasi terdekat.</p></div>
            <div className="step-card"><div className="step-number">2</div><h3>Filter & Bandingkan</h3><p>Gunakan filter noise level, fasilitas WiFi, colokan, AC, dan rentang harga untuk mempersempit pilihan.</p></div>
            <div className="step-card"><div className="step-number">3</div><h3>Kunjungi & Review</h3><p>Temukan tempat terbaik, kunjungi, dan bagikan pengalamanmu melalui review untuk membantu komunitas.</p></div>
          </div>
        </div>
      </section>

      <section className="section fade-in" id="places">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Pilihan Mahasiswa</div>
            <h2 className="section-title">Tempat Nugas Favorit Sekitar Kampus</h2>
            <p className="section-subtitle">Rekomendasi cafe dan coworking space terbaik yang paling sering dikunjungi mahasiswa ITS dan UNAIR Surabaya.</p>
          </div>
          <div className="places-grid">
            {placesData.filter(p => p.address.includes('ITS') || p.address.includes('UNAIR') || p.address.includes('Keputih') || p.address.includes('Dharmawangsa')).slice(0, 6).map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/explore" className="nav-cta" style={{ padding: '14px 32px', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Lihat Semua Tempat
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="section features fade-in" id="features">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Fitur Utama</div>
            <h2 className="section-title">Semua yang Kamu Butuhkan</h2>
            <p className="section-subtitle">Platform lengkap untuk menemukan tempat produktif yang sempurna.</p>
          </div>
          <div className="features-grid">
            {featuresData.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section fade-in" id="testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Testimoni</div>
            <h2 className="section-title">Apa Kata Mereka?</h2>
            <p className="section-subtitle">Ribuan orang telah menggunakan QuietSpace untuk menemukan tempat produktif terbaik di Surabaya.</p>
          </div>
          <div className="testimonials-grid">
            {testimonialsData.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div className="testimonial-info">
                    <div className="t-name">{t.name}</div>
                    <div className="t-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-mitra fade-in" id="mitra">
        <div className="container">
          <h2>Punya Cafe atau Coworking Space?</h2>
          <p>Daftarkan tempatmu di QuietSpace dan jangkau ribuan mahasiswa serta pekerja remote yang mencari tempat produktif setiap harinya.</p>
          <Link href="#" className="cta-mitra-btn">Daftar Sebagai Mitra</Link>
        </div>
      </section>
    </main>
  );
}
