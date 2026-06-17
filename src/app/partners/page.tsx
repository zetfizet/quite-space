'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  BarChart2,
  MessageSquare,
  Percent,
  ArrowRight,
  Plus,
  Wifi,
  Zap,
  Check,
  Coffee,
  ShieldCheck,
  Info,
  Maximize2
} from 'lucide-react';

export default function PartnersPage() {
  // Calculator States
  const [capacity, setCapacity] = useState(50);
  const [emptyRate, setEmptyRate] = useState(40); // empty rate in %
  const [avgTicket, setAvgTicket] = useState(35000); // Rp 35k default



  // Dashboard Mockup States
  const [activeTab, setActiveTab] = useState<'stats' | 'reviews' | 'promotions'>('stats');
  const [isEmptyState, setIsEmptyState] = useState(false);

  // FAQ Accordion States
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculator Logic
  // Formula: capacity * (emptyRate/100) * avgTicket * 20 weekdays * 0.40 conversion capture
  const estimatedRevenue = Math.round(capacity * (emptyRate / 100) * avgTicket * 20 * 0.40);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const faqData = [
    {
      question: "Bagaimana jika remote worker hanya membeli satu kopi dan duduk seharian?",
      answer: "Kami sangat memahami kekhawatiran ini. Di QuietSpace, kami mendidik komunitas kami tentang etika bekerja di cafe (Café Etiquette). Selain itu, kami menyarankan mitra untuk mengaktifkan 'Paket Produktif' (misalnya Rp45.000 untuk paket kopi & pastry untuk durasi 3 jam) atau menerapkan kebijakan minimum spend di area meja kerja yang terdaftar di QuietSpace."
    },
    {
      question: "Bagaimana QuietSpace mengukur Noise Level?",
      answer: "Skor kebisingan kami didasarkan pada verifikasi awal tim kami serta ulasan harian terverifikasi dari pengguna yang melakukan check-in langsung di tempat Anda. Pengguna menilai kebisingan dalam 4 tingkat: Sangat Sunyi, Sunyi, Sedang, dan Ramai."
    },
    {
      question: "Apakah pendaftaran gratis benar-benar tidak dipungut biaya?",
      answer: "Ya, pendaftaran dasar di QuietSpace selamanya gratis. Anda dapat mendaftarkan profil tempat Anda, mencantumkan jam buka, fasilitas, dan mengunggah foto. Kami membebankan biaya bulanan opsional hanya jika Anda ingin meningkatkan visibilitas melalui Paket Pro (Prioritas Pencarian) dan mengakses fitur analitik lanjutan."
    },
    {
      question: "Bagaimana cara kerja verifikasi listing setelah mendaftar?",
      answer: "Setelah Anda mengisi formulir pendaftaran, tim editor kami akan meninjau informasi Anda dalam waktu 1-2 hari kerja. Kami akan mencocokkan fasilitas, foto, dan lokasi Anda sebelum meluncurkan listing Anda ke halaman explore QuietSpace."
    },
    {
      question: "Bolehkah saya membatasi jam berkunjung remote worker?",
      answer: "Tentu saja. Anda memiliki kendali penuh atas jam-jam tertentu yang ingin Anda promosikan sebagai jam kerja. Banyak mitra kami mempromosikan tempat mereka khusus pada jam-jam sepi (Senin-Kamis pukul 09:00 - 15:00) untuk memaksimalkan okupansi meja."
    }
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)', paddingBottom: '80px' }}>

      {/* HERO SECTION */}
      <section className="partners-hero">
        <div className="container">
          <div className="partners-hero-grid">

            {/* HERO TEXT */}
            <div className="partners-hero-text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'var(--green-tint)', color: 'var(--green-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.05em' }}>
                <ShieldCheck size={14} /> Kemitraan QuietSpace
              </div>
              <h1>
                Ubah Kursi Kosong <br />
                <span>Hari Kerja</span> Menjadi Pendapatan Baru.
              </h1>
              <p>
                Hubungkan cafe, coffee shop, atau coworking space Anda dengan 10.000+ mahasiswa, freelancer, dan pekerja remote di Surabaya yang mencari tempat tenang dan produktif di hari kerja.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <Link href="#pricing" className="nav-cta" style={{ padding: '14px 28px', fontSize: '1rem', display: 'inline-block', textAlign: 'center' }}>
                  Daftar Sebagai Mitra
                </Link>
                <a
                  href="#dashboard-preview"
                  style={{ padding: '14px 28px', fontSize: '1rem', display: 'inline-block', textAlign: 'center', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-full)', fontWeight: 600, color: 'var(--gray-700)' }}
                >
                  Lihat Demo Dashboard
                </a>
              </div>

              {/* Stats badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', borderTop: '1px solid var(--gray-200)', paddingTop: '24px', maxWidth: '480px' }}>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--green-primary)' }}>10k+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Pencarian Bulanan</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--green-primary)' }}>25%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Kenaikan Okupansi</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--green-primary)' }}>Rp0</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Mulai Tanpa Resiko</div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE CALCULATOR CARD */}
            <div>
              <div className="calc-card">
                <h3 className="calc-title">
                  <TrendingUp size={20} color="var(--green-primary)" /> Estimasi Pendapatan Anda
                </h3>

                <div className="calc-group">
                  <div className="calc-label-row">
                    <span>Total Kapasitas Kursi:</span>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 700 }}>{capacity} Kursi</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="calc-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>
                    <span>10 Kursi</span>
                    <span>200 Kursi</span>
                  </div>
                </div>

                <div className="calc-group">
                  <div className="calc-label-row">
                    <span>Persentase Kursi Kosong (Weekday):</span>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 700 }}>{emptyRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={emptyRate}
                    onChange={(e) => setEmptyRate(Number(e.target.value))}
                    className="calc-slider"
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>
                    <span>10% (Cukup Ramai)</span>
                    <span>90% (Sangat Sepi)</span>
                  </div>
                </div>

                <div className="calc-group">
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>
                    Rata-rata Transaksi per Orang:
                  </div>
                  <div className="calc-price-grid">
                    {[25000, 35000, 50000, 75000].map((price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() => setAvgTicket(price)}
                        className={`calc-price-btn ${avgTicket === price ? 'active' : ''}`}
                      >
                        Rp{price / 1000}k
                      </button>
                    ))}
                  </div>
                </div>

                <div className="calc-result-box">
                  <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Estimasi Pendapatan Tambahan / Bulan:
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--green-primary)', letterSpacing: '-0.02em' }}>
                    {formatRupiah(estimatedRevenue)}
                  </div>
                  <p style={{ fontSize: '0.65rem', color: 'var(--gray-400)', marginTop: '8px', fontStyle: 'italic', lineHeight: 1.4 }}>
                    *Estimasi dengan asumsi QuietSpace membantu mengonversi 40% dari total kursi kosong Anda selama 20 hari kerja aktif per bulan.
                  </p>
                </div>

                <Link href="#pricing" className="nav-cta" style={{ width: '100%', display: 'block', textAlign: 'center', padding: '14px 0', fontSize: '1rem', marginTop: '24px' }}>
                  Klaim Listing Gratis Sekarang
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF: BRAND STRIP */}
      <section className="brands-strip">
        <div className="container">
          <div className="brands-title">Dipercaya oleh Kafe & Ruang Kerja Terbaik di Surabaya</div>
          <div className="brands-flex">
            <span className="brand-item" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Coffee size={20} color="var(--green-primary)" /> NugaSpace
            </span>
            <span className="brand-item">Calibre Coffee</span>
            <span className="brand-item">Volks Coffee</span>
            <span className="brand-item">Titik Koma</span>
            <span className="brand-item">Monopole Lab</span>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Keunggulan Kami</div>
            <h2 className="section-title">Mengapa Bermitra dengan QuietSpace?</h2>
            <p className="section-subtitle">Kami mempertemukan pemilik ruang usaha dengan konsumen khusus yang membutuhkan ketenangan dan kenyamanan kerja.</p>
          </div>

          <div className="benefits-grid">
            {/* Value card 1 */}
            <div className="benefit-card">
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>📈</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--gray-900)' }}>Isi Kursi Jam Sepi (Weekday)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Ubah jam-jam lambat operasional Anda (Senin s/d Kamis siang) menjadi jam sibuk. Dapatkan kunjungan konsisten dari pekerja remote dan mahasiswa yang aktif di jam tersebut.
              </p>
            </div>

            {/* Value card 2 */}
            <div className="benefit-card">
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--gray-900)' }}>Trafik Berkualitas Tinggi</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Pengunjung QuietSpace adalah pelanggan berdurasi lama yang menghargai fasilitas Anda. Mereka siap memesan makanan dan minuman secara berkala sepanjang sesi kerja mereka.
              </p>
            </div>

            {/* Value card 3 */}
            <div className="benefit-card">
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>📊</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', color: 'var(--gray-900)' }}>Kontrol Reputasi Usaha</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Pantau masukan langsung dari pengguna mengenai tingkat kebisingan, kestabilan koneksi internet WiFi, serta ketersediaan colokan listrik untuk terus meningkatkan standar kepuasan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DASHBOARD PREVIEW */}
      <section className="dashboard-preview-section" id="dashboard-preview">
        <div className="container">
          <div className="dashboard-grid">

            {/* Text details */}
            <div>
              <div className="section-label" style={{ marginBottom: '16px' }}>SaaS Dashboard Preview</div>
              <h2 className="section-title" style={{ fontSize: '2.2rem', textAlign: 'left', lineHeight: 1.2 }}>Kelola Listing Anda dengan Dashboard Cerdas</h2>
              <p className="section-subtitle" style={{ margin: '20px 0', textAlign: 'left', fontSize: '1rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Lihat ulasan, kelola kampanye promo kafe, dan pantau bagaimana traffic QuietSpace meningkatkan omzet bulanan tempat Anda.
              </p>

              <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--gray-700)' }}>
                  <span style={{ display: 'inline-flex', width: '20px', height: '20px', borderRadius: '50%', background: isEmptyState ? '#FEE2E2' : '#D8F3DC', color: isEmptyState ? '#EF4444' : '#2D6A4F', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</span>
                  Status Simulasi: {isEmptyState ? 'Tampilan Awal (Kosong)' : 'Tampilan Aktif (Berdata)'}
                </div>
                {/* STATE TOGGLE */}
                <button
                  onClick={() => setIsEmptyState(!isEmptyState)}
                  style={{
                    padding: '12px 20px', fontSize: '0.85rem', fontWeight: 700,
                    background: isEmptyState ? 'var(--green-primary)' : 'var(--white)',
                    color: isEmptyState ? 'var(--white)' : 'var(--gray-700)',
                    border: isEmptyState ? '1px solid var(--green-primary)' : '1px solid var(--gray-300)',
                    borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s', width: 'fit-content'
                  }}
                >
                  {isEmptyState ? 'Tampilkan Data Simulasi' : 'Simulasikan Tanpa Data (Empty State)'}
                </button>
              </div>
            </div>

            {/* Dashboard Mockup Screen */}
            <div className="mockup-frame">
              {/* Browser Header Bar */}
              <div className="mockup-header">
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid var(--gray-200)', borderRadius: '4px', fontSize: '9px', padding: '2px 32px', fontFamily: 'monospace', color: 'var(--gray-400)' }}>
                  partner.quietspace.id/calibre-coffee
                </div>
                <Maximize2 size={12} className="text-gray-400" />
              </div>

              {/* Dashboard layout inside */}
              <div className="mockup-window">
                {/* Left nav panel mockup */}
                <div className="mockup-sidebar">
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--green-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Coffee size={16} /> Calibre Coffee
                  </div>

                  <button
                    onClick={() => !isEmptyState && setActiveTab('stats')}
                    disabled={isEmptyState}
                    className={`mockup-tab-btn ${activeTab === 'stats' && !isEmptyState ? 'active' : ''}`}
                  >
                    <BarChart2 size={12} /> Ringkasan Statistik
                  </button>
                  <button
                    onClick={() => !isEmptyState && setActiveTab('reviews')}
                    disabled={isEmptyState}
                    className={`mockup-tab-btn ${activeTab === 'reviews' && !isEmptyState ? 'active' : ''}`}
                  >
                    <MessageSquare size={12} /> Ulasan Kebisingan
                  </button>
                  <button
                    onClick={() => !isEmptyState && setActiveTab('promotions')}
                    disabled={isEmptyState}
                    className={`mockup-tab-btn ${activeTab === 'promotions' && !isEmptyState ? 'active' : ''}`}
                  >
                    <Percent size={12} /> Promosi Khusus
                  </button>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize: '8px', color: 'var(--gray-400)', fontWeight: 700, marginBottom: '4px' }}>STATUS LISTING:</div>
                    <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#D8F3DC', color: '#2D6A4F', fontSize: '8px', fontWeight: 700, gap: '2px', alignItems: 'center' }}>
                      <Check size={8} /> Aktif / Terverifikasi
                    </span>
                  </div>
                </div>

                {/* Right Main Content Panel */}
                <div className="mockup-content">
                  {isEmptyState ? (
                    /* EMPTY STATE PREVIEW */
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--gray-100)', color: 'var(--gray-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem', border: '1px dashed var(--gray-300)' }}>
                        📊
                      </div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: '4px' }}>
                        Dashboard Anda Sedang Disiapkan
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', maxWidth: '280px', margin: '0 auto 16px', lineHeight: 1.4 }}>
                        Daftarkan cafe Anda terlebih dahulu. Begitu tempat Anda terverifikasi dan mendapat ulasan pertama, grafik performa akan muncul di sini!
                      </p>
                      <Link href="#pricing" className="nav-cta" style={{ fontSize: '0.8rem', padding: '8px 16px', display: 'inline-block', width: 'fit-content', margin: '0 auto' }}>
                        Daftar Sekarang
                      </Link>
                    </div>
                  ) : (
                    /* ACTIVE STATE PREVIEWS */
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      {/* Stat Content */}
                      {activeTab === 'stats' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-900)' }}>Performa Bulan Ini</h4>
                            <span style={{ fontSize: '9px', backgroundColor: 'var(--green-tint)', color: 'var(--green-primary)', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Mei 2026</span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            <div style={{ backgroundColor: 'var(--gray-50)', border: '1px solid var(--gray-100)', padding: '10px', borderRadius: '6px' }}>
                              <div style={{ fontSize: '8px', color: 'var(--gray-400)', fontWeight: 700 }}>TAMPIL PENCARIAN</div>
                              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gray-800)' }}>1,240</div>
                              <div style={{ fontSize: '8px', color: '#10B981', fontWeight: 700 }}>+18.5%</div>
                            </div>
                            <div style={{ backgroundColor: 'var(--gray-50)', border: '1px solid var(--gray-100)', padding: '10px', borderRadius: '6px' }}>
                              <div style={{ fontSize: '8px', color: 'var(--gray-400)', fontWeight: 700 }}>CHECK-INS</div>
                              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--green-primary)' }}>320</div>
                              <div style={{ fontSize: '8px', color: '#10B981', fontWeight: 700 }}>+24.1%</div>
                            </div>
                            <div style={{ backgroundColor: 'var(--gray-50)', border: '1px solid var(--gray-100)', padding: '10px', borderRadius: '6px' }}>
                              <div style={{ fontSize: '8px', color: 'var(--gray-400)', fontWeight: 700 }}>AVG STAY</div>
                              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gray-800)' }}>3.2 jam</div>
                              <div style={{ fontSize: '8px', color: 'var(--gray-400)', fontWeight: 500 }}>Optimal</div>
                            </div>
                          </div>

                          {/* Custom CSS Bar Graph */}
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8px', color: 'var(--gray-400)', marginBottom: '8px', fontWeight: 700 }}>
                              <span>Kunjungan Terbanyak Hari Kerja (Senin-Jumat)</span>
                              <span style={{ color: 'var(--gray-600)' }}>Jam puncak: 11:00 - 15:00</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', justifyContent: 'space-between', height: '80px', paddingTop: '8px', borderBottom: '1px solid var(--gray-100)' }}>
                              {[
                                { day: 'Sen', val: '24px' },
                                { day: 'Sel', val: '40px' },
                                { day: 'Rab', val: '64px', active: true },
                                { day: 'Kam', val: '56px', active: true },
                                { day: 'Jum', val: '32px' }
                              ].map((bar, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                  <div style={{ width: '100%', height: bar.val, borderRadius: '2px 2px 0 0', backgroundColor: bar.active ? 'var(--green-primary)' : 'var(--gray-200)', transition: 'all 0.5s' }}></div>
                                  <span style={{ fontSize: '8px', color: 'var(--gray-400)', fontWeight: 700 }}>{bar.day}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Reviews Content */}
                      {activeTab === 'reviews' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-900)' }}>Feedback Suasana & Fasilitas</h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>

                            <div style={{ padding: '10px', backgroundColor: 'var(--gray-50)', border: '1px solid var(--gray-100)', borderRadius: '6px', fontSize: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontWeight: 700, color: 'var(--gray-800)' }}>Citra M.</span>
                                <span style={{ fontSize: '8px', color: 'var(--gray-400)' }}>1 jam lalu</span>
                              </div>
                              <p style={{ color: 'var(--gray-600)', fontStyle: 'italic', lineHeight: 1.4 }}>"Tempatnya cocok buat remote working. Suasananya tenang (Noise level: Sunyi), WiFi stabil buat Google Meet, colokan banyak."</p>
                              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                                <span style={{ backgroundColor: 'var(--green-tint)', color: 'var(--green-primary)', fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                  <Zap size={8} /> Noise Level: Sunyi
                                </span>
                                <span style={{ backgroundColor: 'var(--green-tint)', color: 'var(--green-primary)', fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                  <Wifi size={8} /> WiFi Cepat
                                </span>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* Promotions Content */}
                      {activeTab === 'promotions' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-900)' }}>Voucher & Promosi Aktif</h4>
                            <button style={{ padding: '4px 8px', backgroundColor: 'var(--green-primary)', color: 'white', borderRadius: '4px', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px', border: 'none', cursor: 'pointer' }}>
                              <Plus size={10} /> Buat Baru
                            </button>
                          </div>

                          <div style={{ border: '1px dashed var(--gray-200)', borderRadius: '6px', padding: '10px', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(248, 244, 240, 0.5)' }}>
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--gray-800)' }}>Paket Work-From-Cafe</div>
                              <div style={{ fontSize: '8px', color: 'var(--gray-400)', marginTop: '2px' }}>Diskon 15% minimal pembelian Rp40k (Senin-Kamis siang)</div>
                            </div>
                            <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--green-tint)', color: 'var(--green-primary)', fontSize: '8px', fontWeight: 700 }}>AKTIF</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (SaaS Onboarding) */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Langkah Bergabung</div>
            <h2 className="section-title">3 Langkah Mudah Menjadi Mitra</h2>
            <p className="section-subtitle">Kami menyederhanakan proses onboarding agar Anda dapat fokus menyambut pelanggan.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {/* Step 1 */}
            <div style={{ backgroundColor: 'var(--white)', padding: '40px 32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '32px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--green-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gray-900)', marginTop: '8px', marginBottom: '12px' }}>Daftarkan Profil Cafe</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Isi detail cafe Anda mulai dari lokasi, ketersediaan colokan listrik, AC, kecepatan internet WiFi, dan unggah foto suasana tempat Anda bekerja.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ backgroundColor: 'var(--white)', padding: '40px 32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '32px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--green-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gray-900)', marginTop: '8px', marginBottom: '12px' }}>Verifikasi & Audit</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Tim editorial kami akan melakukan verifikasi data dan secara objektif mengevaluasi tingkat kebisingan sebelum meluncurkan listing Anda ke platform QuietSpace.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ backgroundColor: 'var(--white)', padding: '40px 32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-20px', left: '32px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--green-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gray-900)', marginTop: '8px', marginBottom: '12px' }}>Sambut Pelanggan Baru</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Kini profil cafe Anda tampil di halaman pencari kerja Surabaya. Gunakan dashboard mitra untuk mengaktifkan promo khusus guna menggaet lebih banyak pelanggan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="section" id="pricing" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Pilihan Skema Biaya</div>
            <h2 className="section-title">Investasi Fleksibel Sesuai Kebutuhan Bisnis Anda</h2>
            <p className="section-subtitle">Mulai gratis untuk mendaftarkan tempat Anda, atau tingkatkan visibilitas dengan Paket Pro untuk performa promosi maksimal.</p>
          </div>

          <div className="pricing-grid">
            {/* Plan 1: Starter */}
            <div className="pricing-card">
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>PAKET DASAR</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>Starter</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '24px', lineHeight: 1.5 }}>
                  Cantumkan bisnis Anda di pencarian dasar QuietSpace agar mulai ditemukan mahasiswa dan pekerja sekitar.
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--gray-900)' }}>Rp0</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>/ selamanya</span>
                </div>

                <ul style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> Profil Bisnis Standar
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> Skor Kebisingan Komunitas
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> Listing Fasilitas & Menu (1 Foto)
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> Respon Ulasan Pelanggan
                  </li>
                </ul>
              </div>

              <button
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: 'var(--gray-800)',
                  border: '1px solid var(--gray-300)',
                  marginTop: '40px',
                  padding: '14px 0',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--gray-100)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Mulai Daftar Gratis
              </button>
            </div>

            {/* Plan 2: Pro */}
            <div className="pricing-card premium">
              <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'var(--green-primary)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '6px 16px', borderRadius: '0 0 0 12px', letterSpacing: '0.05em' }}>
                REKOMENDASI
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>PERTUMBUHAN BISNIS</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>Pro</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '24px', lineHeight: 1.5 }}>
                  Prioritas pencarian teratas, akses dashboard statistik pengunjung terperinci, dan kebebasan membuat voucher promosi.
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--gray-900)' }}>Rp149k</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>/ bulan</span>
                </div>

                <ul style={{ borderTop: '1px solid var(--gray-200)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> <strong>Semua fitur Paket Starter</strong>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> <strong>Prioritas Posisi Teratas</strong> di Pencarian
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> Akses Dashboard Analytics Pengunjung
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> Buat Voucher / Promosi Diskon Khusus
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--green-primary)', fontWeight: 'bold' }}>✓</span> Lencana <strong>Mitra Unggulan Terverifikasi</strong>
                  </li>
                </ul>
              </div>

              <button className="nav-cta" style={{ width: '100%', marginTop: '40px', padding: '14px 0' }}>
                Uji Coba Gratis 14 Hari
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Tanya Jawab</div>
            <h2 className="section-title">Pertanyaan yang Sering Diajukan</h2>
            <p className="section-subtitle">Semua hal penting yang perlu Anda ketahui tentang kemitraan QuietSpace.</p>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div key={index} className="faq-item">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="faq-question-btn"
                  >
                    <span>{faq.question}</span>
                    <span style={{ transform: isExpanded ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', display: 'inline-flex' }}>
                      <Plus size={20} />
                    </span>
                  </button>

                  <div
                    className="faq-answer-container"
                    style={{
                      maxHeight: isExpanded ? '200px' : '0',
                      borderTop: isExpanded ? '1px solid var(--gray-100)' : 'none'
                    }}
                  >
                    <p style={{ padding: '24px', fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.6, background: 'rgba(248, 244, 240, 0.3)' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA FOOTER CARD */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="final-cta-card">
            {/* Background design elements */}
            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>

            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', position: 'relative', zIndex: 1 }}>
              Siap Mengisi Kursi Kosong Anda?
            </h2>
            <p style={{ fontSize: '1.05rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 32px', position: 'relative', zIndex: 1, lineHeight: 1.6 }}>
              Bergabunglah dengan jaringan mitra kafe di Surabaya hari ini. Gratis pendaftaran, tanpa biaya awal, dapat dibatalkan kapan saja.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <Link
                href="#pricing"
                style={{
                  backgroundColor: 'var(--white)',
                  color: 'var(--green-primary)',
                  padding: '16px 36px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-block',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: 'var(--shadow-md)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              >
                Daftarkan Kafe Sekarang
              </Link>
              <a
                href="https://wa.me/6285859190819"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '16px 36px', fontSize: '1rem', fontWeight: 700, border: '1px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-full)', color: 'var(--white)', display: 'inline-block' }}
              >
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>



    </main>
  );
}
