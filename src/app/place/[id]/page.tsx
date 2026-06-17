'use client';

import { use, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { placesData, getNoiseInfo } from '@/data';
import { MapPin, Star, Wifi, Wind, Plug, Clock, Users, Coffee, ArrowLeft, X, Check, QrCode, Phone, User } from 'lucide-react';
import PlaceCard from '@/components/PlaceCard';

const getAvatarColors = (initial: string) => {
  const code = (initial || 'A').charCodeAt(0);
  const colorSchemes = [
    { bg: 'var(--green-tint)', text: 'var(--green-primary)' },
    { bg: '#E0F2FE', text: '#0369A1' }, // Sky/Blue
    { bg: '#FEE2E2', text: '#DC2626' }, // Red/Rose
    { bg: '#FEF3C7', text: '#D97706' }, // Amber/Yellow
    { bg: '#F3E8FF', text: '#7E22CE' }, // Purple
    { bg: '#ECFDF5', text: '#047857' }, // Emerald
  ];
  return colorSchemes[code % colorSchemes.length];
};

export default function PlaceDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const place = placesData.find(p => p.id === parseInt(id));

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ id: string; name: string; price: string; priceRaw: number; description: string; benefits: { icon: ReactNode; text: string }[]; popular: boolean } | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [isPaying, setIsPaying] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [activePassTab, setActivePassTab] = useState<'nugas-lancar' | 'produktif-pro'>('nugas-lancar');

  const packages = [
    {
      id: 'nugas-lancar',
      name: 'Paket Nugas Lancar',
      price: 'Rp35.000',
      priceRaw: 35000,
      description: 'Pilihan pas untuk nugas hemat fokus tanpa batas.',
      benefits: [
        { icon: <Coffee size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: '1 Kopi/Teh Pilihan' },
        { icon: <Plug size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: 'Akses Stopkontak Prioritas' },
        { icon: <Wifi size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: 'Koneksi WiFi Cepat 50 Mbps' },
        { icon: <Clock size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: 'Durasi Maksimal 4 Jam' },
      ],
      popular: false
    },
    {
      id: 'produktif-pro',
      name: 'Paket Produktif Pro',
      price: 'Rp60.000',
      priceRaw: 60000,
      description: 'Layanan lengkap untuk sesi kerja intensif seharian.',
      benefits: [
        { icon: <Coffee size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: '1 Minuman + 1 Snack/Camilan' },
        { icon: <Plug size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: 'Colokan Listrik Prioritas' },
        { icon: <Wifi size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: 'Akses WiFi Premium Unlimited' },
        { icon: <Clock size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: 'Durasi Seharian Tanpa Batas' },
        { icon: <Check size={16} color="var(--green-primary)" style={{ flexShrink: 0 }} />, text: 'Diskon 10% untuk Kunjungan Berikutnya' }
      ],
      popular: true
    }
  ];

  const selectedPkg = packages.find(pkg => pkg.id === activePassTab);

  if (!place) {
    return (
      <div className="container" style={{ padding: '140px 24px', textAlign: 'center' }}>
        <h2>Tempat tidak ditemukan</h2>
        <button onClick={() => router.push('/explore')} className="nav-cta" style={{ display: 'inline-block', marginTop: '20px' }}>
          Kembali Eksplorasi
        </button>
      </div>
    );
  }

  const n = getNoiseInfo(place.noiseScore);
  
  const similarPlaces = placesData
    .filter(p => p.noiseScore === place.noiseScore && p.id !== place.id)
    .slice(0, 3);

  return (
    <div style={{ background: 'var(--cream)', paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh' }}>
      <div className="container">
        <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--gray-500)', marginBottom: '24px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
          <ArrowLeft size={16} /> Kembali ke Pencarian
        </button>
        
        <div className="detail-layout">
          
          {/* KIRI: Foto & Info Utama */}
          <div>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '400px', marginBottom: '32px', boxShadow: 'var(--shadow-md)' }}>
              <img src={place.photo} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className={`place-badge ${place.noiseScore <= 2 ? 'quiet' : 'medium'}`} style={{ position: 'static', boxShadow: 'var(--shadow-sm)' }}>
                  {n.label}
                </span>
                {place.crowdStatus && (
                  <span className={`place-badge crowd ${place.crowdStatus}`} style={{ position: 'static', boxShadow: 'var(--shadow-sm)' }}>
                    {place.crowdStatus === 'sepi' ? '🟢 Sedang Sepi' : place.crowdStatus === 'sedang' ? '🟡 Mulai Ramai' : '🔴 Hampir Penuh'}
                  </span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--green-mid)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                {place.category}
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '12px' }}>
                {place.name}
              </h1>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gray-500)', fontSize: '1.05rem', marginBottom: '20px' }}>
                <MapPin size={18} /> {place.address}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--gray-200)', paddingBottom: '24px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.1rem', fontWeight: 700 }}>
                  <Star fill="var(--yellow)" color="var(--yellow)" size={20} />
                  {place.rating} <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>({place.reviewCount} Review)</span>
                </div>
                <div style={{ color: 'var(--gray-300)' }}>|</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {place.tags.map(t => (
                    <span key={t} className="place-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fasilitas Lengkap */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px', color: 'var(--gray-900)' }}>Fasilitas untuk Produktivitas</h3>
              <div className="detail-facilities">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ color: 'var(--green-primary)', background: 'var(--green-tint)', padding: '10px', borderRadius: '50%' }}><Wifi size={22} /></div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--gray-800)', marginBottom: '4px' }}>Internet Super Cepat</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>Rata-rata 45-50 Mbps. Stabil untuk Zoom Call dan unduh file besar.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ color: 'var(--green-primary)', background: 'var(--green-tint)', padding: '10px', borderRadius: '50%' }}><Plug size={22} /></div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--gray-800)', marginBottom: '4px' }}>Colokan Melimpah</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>Hampir di setiap meja tersedia minimal 2 colokan listrik.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ color: 'var(--green-primary)', background: 'var(--green-tint)', padding: '10px', borderRadius: '50%' }}><Coffee size={22} /></div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--gray-800)', marginBottom: '4px' }}>Menu & Aturan</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>Wajib beli minum, tidak ada minimum *spend*. Range: {place.priceRange}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ color: 'var(--green-primary)', background: 'var(--green-tint)', padding: '10px', borderRadius: '50%' }}><Wind size={22} /></div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--gray-800)', marginBottom: '4px' }}>Ruangan & Suhu</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.5 }}>AC dingin merata. Area Smoking terpisah di luar ruangan.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
            <div style={{ background: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--gray-200)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '24px' }}>Status Saat Ini</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--gray-800)' }}>
                  <Clock size={20} color="var(--green-primary)" />
                  <span style={{ fontWeight: 600 }}>Jam Buka</span>
                </div>
                <div style={{ fontWeight: 700 }}>{place.hours}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--gray-800)' }}>
                  <Users size={20} color="var(--green-primary)" />
                  <span style={{ fontWeight: 600 }}>Prediksi Keramaian</span>
                </div>
                <div style={{ fontWeight: 700, color: place.crowdStatus === 'sepi' ? 'var(--green-primary)' : place.crowdStatus === 'sedang' ? 'var(--yellow)' : 'var(--red)' }}>
                  {place.crowdStatus === 'sepi' ? 'Cenderung Sepi' : place.crowdStatus === 'sedang' ? 'Mulai Ramai' : 'Biasanya Penuh'}
                </div>
              </div>

              <button className="nav-cta" style={{ width: '100%', padding: '16px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', borderRadius: 'var(--radius-md)', opacity: 0.5 }} disabled>
                Reservasi (Segera Hadir)
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--gray-400)', marginTop: '16px' }}>
                Fitur reservasi sedang dalam pengembangan.
              </p>
            </div>

            {/* Ambience Card */}
            <div style={{ background: 'var(--green-dark)', color: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', color: 'var(--green-tint)' }}>Analitik Kebisingan</h3>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>{place.noiseScore}</div>
                <div style={{ paddingBottom: '6px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--green-wash)', fontSize: '1.1rem' }}>{n.label}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Skala 1 (Sunyi) - 4 (Ramai)</div>
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--green-tint)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vibe Check</div>
                <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5 }}>
                  <li style={{ marginBottom: '6px' }}>✔️ Cocok untuk Ngetik & Fokus</li>
                  <li style={{ marginBottom: '6px' }}>✔️ Aman untuk Zoom / Online Meeting</li>
                  <li>❌ Kurang cocok untuk ngobrol ramai</li>
                </ul>
              </div>
            </div>

            {/* Peta Lokasi */}
            <div style={{ background: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', color: 'var(--gray-900)' }}>Lokasi Peta</h3>
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(place.name + " Surabaya")}&t=&z=15&ie=UTF8&iwloc=&output=embed`} 
                width="100%" 
                height="280" 
                style={{ border: 0, borderRadius: 'var(--radius-md)' }} 
                allowFullScreen={false} 
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>

        {/* QuietSpace Pass Section (Full Width under detail-layout grid) */}
        <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--gray-200)' }}>
          <div style={{ background: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ background: 'var(--green-tint)', color: 'var(--green-primary)', padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Hemat & Prioritas
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>
              QuietSpace Pass™
            </h3>
            <p style={{ color: 'var(--gray-500)', fontSize: '1rem', marginBottom: '24px' }}>
              Pesan paket khusus di {place.name} untuk jaminan tempat duduk terbaik, koneksi internet prioritas, dan menu makanan/minuman hemat.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {packages.map((pkg) => (
                <div key={pkg.id} style={{ 
                  position: 'relative', 
                  padding: '24px', 
                  borderRadius: 'var(--radius-lg)', 
                  border: pkg.popular ? '2px solid var(--green-primary)' : '1px solid var(--gray-200)', 
                  background: 'var(--white)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: pkg.popular ? 'var(--shadow-md)' : 'none'
                }}>
                  {pkg.popular && (
                    <span style={{ 
                      position: 'absolute', top: '-12px', right: '24px', 
                      background: 'var(--green-primary)', color: 'var(--white)', 
                      padding: '4px 12px', borderRadius: 'var(--radius-full)', 
                      fontSize: '0.75rem', fontWeight: 700 
                    }}>
                      Paling Populer
                    </span>
                  )}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>{pkg.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '16px', minHeight: '36px' }}>{pkg.description}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-900)' }}>{pkg.price}</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>/ sesi</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {pkg.benefits.map((b, idx) => (
                        <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--gray-700)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {b.icon}
                          <span>{b.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setCheckoutStep(1);
                      setIsCheckoutOpen(true);
                    }}
                    className="nav-cta" 
                    style={{ 
                      width: '100%', 
                      padding: '12px 0', 
                      fontSize: '0.95rem', 
                      fontWeight: 700, 
                      border: 'none', 
                      borderRadius: 'var(--radius-md)',
                      background: pkg.popular ? 'var(--green-primary)' : 'var(--gray-900)',
                      color: 'var(--white)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    Pesan Sekarang
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Komunitas (Full Width) */}
        <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--gray-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>Review Komunitas Produktif</h2>
              <p style={{ color: 'var(--gray-500)', fontSize: '1rem' }}>Berdasarkan pengalaman nugas & kerja remote dari komunitas.</p>
            </div>
            <button className="nav-cta" style={{ padding: '12px 24px', fontSize: '1rem', background: 'var(--gray-900)', whiteSpace: 'nowrap', opacity: 0.5 }} disabled>
              Tulis Review (Segera Hadir)
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {place.reviews && place.reviews.length > 0 ? (
              place.reviews.map((rev, index) => {
                const colors = getAvatarColors(rev.initial);
                return (
                  <div key={index} style={{ background: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: '50%', 
                          background: colors.bg, 
                          color: colors.text, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 700, 
                          fontSize: '1.2rem' 
                        }}>
                          {rev.initial}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: 'var(--gray-800)', fontSize: '1.05rem' }}>{rev.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{rev.role} • {rev.date}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            fill={i < rev.rating ? "var(--yellow)" : "none"} 
                            color={i < rev.rating ? "var(--yellow)" : "var(--gray-300)"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p style={{ color: 'var(--gray-700)', lineHeight: 1.6, fontSize: '1rem' }}>
                      "{rev.text}"
                    </p>
                  </div>
                );
              })
            ) : (
              <p style={{ color: 'var(--gray-500)', fontSize: '1rem', fontStyle: 'italic', gridColumn: '1 / -1' }}>
                Belum ada review untuk tempat ini.
              </p>
            )}
          </div>
        </div>


        {/* Tempat Serupa / Rekomendasi */}
        {similarPlaces.length > 0 && (
          <div style={{ marginTop: '80px', borderTop: '1px solid var(--gray-200)', paddingTop: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>Tempat Serupa Lainnya</h2>
                <p style={{ color: 'var(--gray-500)' }}>Rekomendasi dengan tingkat kebisingan <strong>{n.label}</strong> yang mirip.</p>
              </div>
              <Link 
                href="/explore" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  padding: '12px 28px', 
                  borderRadius: 'var(--radius-full)', 
                  background: 'transparent', 
                  color: 'var(--green-primary)', 
                  border: '2px solid var(--green-primary)', 
                  fontWeight: 700, 
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--green-tint)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                Eksplorasi Lainnya
              </Link>
            </div>
            <div className="places-grid">
              {similarPlaces.map(p => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </div>
          </div>
        )}

        {/* CSS lokal untuk spinner */}
        <style>{`
          @keyframes qs-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .qs-spinner {
            animation: qs-spin 1s linear infinite;
          }
        `}</style>

        {/* MODAL SIMULASI CHECKOUT */}
        {isCheckoutOpen && selectedPackage && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            zIndex: 9999, background: 'rgba(0,0,0,0.5)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            padding: '20px', backdropFilter: 'blur(4px)' 
          }}>
            <div style={{ 
              background: 'var(--white)', 
              borderRadius: 'var(--radius-xl)', 
              width: '100%', 
              maxWidth: '520px', 
              boxShadow: 'var(--shadow-xl)', 
              border: '1px solid var(--gray-200)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh'
            }}>
              {/* Header Modal */}
              <div style={{ 
                padding: '20px 24px', 
                borderBottom: '1px solid var(--gray-100)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'var(--gray-50)'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>Checkout QuietSpace Pass™</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', margin: 0 }}>{place.name}</p>
                </div>
                {checkoutStep !== 4 && (
                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: '4px' }}
                  >
                    <X size={24} />
                  </button>
                )}
              </div>

              {/* Progress Steps Indicator */}
              {checkoutStep !== 4 && (
                <div style={{ display: 'flex', padding: '16px 24px', background: 'var(--white)', borderBottom: '1px solid var(--gray-100)', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  {[
                    { step: 1, label: 'Formulir' },
                    { step: 2, label: 'Metode Bayar' },
                    { step: 3, label: 'Scan QRIS' }
                  ].map((s) => (
                    <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: s.step === 3 ? '0 1 auto' : '1 1 auto' }}>
                      <div style={{ 
                        width: '24px', height: '24px', borderRadius: '50%', 
                        background: checkoutStep >= s.step ? 'var(--green-primary)' : 'var(--gray-200)', 
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontSize: '0.8rem', fontWeight: 700 
                      }}>
                        {checkoutStep > s.step ? <Check size={14} /> : s.step}
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: checkoutStep === s.step ? 700 : 500, color: checkoutStep >= s.step ? 'var(--gray-800)' : 'var(--gray-400)' }}>
                        {s.label}
                      </span>
                      {s.step < 3 && <div style={{ height: '2px', background: checkoutStep > s.step ? 'var(--green-primary)' : 'var(--gray-200)', flex: '1 1 auto' }} />}
                    </div>
                  ))}
                </div>
              )}

              {/* Content Modal */}
              <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                
                {/* STEP 1: FORM DATA & SUMMARY */}
                {checkoutStep === 1 && (
                  <div>
                    <div style={{ background: 'var(--green-tint)', color: 'var(--green-primary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '4px' }}>{selectedPackage.name}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Harga Spesial di QuietSpace: <strong>{selectedPackage.price}</strong></div>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gray-800)', marginBottom: '16px' }}>Data Pemesan</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-600)', marginBottom: '6px' }}>Nama Lengkap</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }}>
                            <User size={16} />
                          </span>
                          <input 
                            type="text" 
                            placeholder="Contoh: Budi Santoso"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-300)', outline: 'none', fontSize: '0.95rem', background: 'var(--white)', color: 'var(--gray-800)' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-600)', marginBottom: '6px' }}>No. WhatsApp / HP</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }}>
                            <Phone size={16} />
                          </span>
                          <input 
                            type="tel" 
                            placeholder="Contoh: 081234567890"
                            value={formData.phone}
                            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-300)', outline: 'none', fontSize: '0.95rem', background: 'var(--white)', color: 'var(--gray-800)' }}
                          />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px', display: 'block' }}>Digunakan untuk mengirimkan e-tiket cadangan via WA.</span>
                      </div>
                    </div>

                    {/* Ringkasan Pembayaran */}
                    <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '20px' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gray-800)', marginBottom: '12px' }}>Ringkasan Biaya</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{selectedPackage.name}</span>
                          <span>{selectedPackage.price}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Biaya Layanan</span>
                          <span>Rp1.000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'var(--gray-900)', borderTop: '1px dashed var(--gray-200)', paddingTop: '10px', marginTop: '4px', fontSize: '1rem' }}>
                          <span>Total Pembayaran</span>
                          <span>Rp{(selectedPackage.priceRaw + 1000).toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: METODE PEMBAYARAN */}
                {checkoutStep === 2 && (
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gray-800)', marginBottom: '16px' }}>Pilih Metode Pembayaran</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                      {[
                        { id: 'QRIS', name: 'QRIS (Gojek, OVO, ShopeePay, Dana, M-Banking)', icon: '📱', desc: 'Scan instan, verifikasi otomatis' },
                        { id: 'VA', name: 'Bank Transfer / Virtual Account (BCA, Mandiri, BNI)', icon: '🏦', desc: 'Verifikasi dalam 1-2 menit' }
                      ].map(method => (
                        <div 
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          style={{ 
                            padding: '16px', 
                            borderRadius: 'var(--radius-lg)', 
                            border: paymentMethod === method.id ? '2px solid var(--green-primary)' : '1px solid var(--gray-200)', 
                            background: paymentMethod === method.id ? 'rgba(45,106,79,0.03)' : 'var(--white)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ fontSize: '1.5rem' }}>{method.icon}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gray-800)' }}>{method.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{method.desc}</div>
                          </div>
                          <div style={{ 
                            width: '20px', height: '20px', borderRadius: '50%', 
                            border: `2px solid ${paymentMethod === method.id ? 'var(--green-primary)' : 'var(--gray-300)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {paymentMethod === method.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green-primary)' }} />}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ background: 'var(--gray-50)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, color: 'var(--gray-700)' }}>
                        <span>Total Bayar:</span>
                        <span style={{ color: 'var(--green-primary)', fontSize: '1rem' }}>Rp{(selectedPackage.priceRaw + 1000).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: QRIS / SIMULASI PEMBAYARAN */}
                {checkoutStep === 3 && (
                  <div style={{ textAlign: 'center' }}>
                    {isPaying ? (
                      <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div 
                          className="qs-spinner"
                          style={{ 
                            width: '48px', height: '48px', borderRadius: '50%', 
                            border: '4px solid var(--green-tint)', borderTop: '4px solid var(--green-primary)'
                          }} 
                        />
                        <div style={{ fontWeight: 700, color: 'var(--gray-800)' }}>Memverifikasi Pembayaran...</div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Mohon tunggu sebentar, transaksi sedang diproses.</p>
                      </div>
                    ) : (
                      <div>
                        <div style={{ marginBottom: '16px' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Scan QRIS untuk Membayar</span>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gray-800)', marginTop: '4px' }}>
                            Rp{(selectedPackage.priceRaw + 1000).toLocaleString('id-ID')}
                          </div>
                        </div>

                        {/* Simulated QR Code */}
                        <div style={{ display: 'inline-block', padding: '16px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)', marginBottom: '16px' }}>
                          <div style={{ width: '180px', height: '180px', background: '#f3f4f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '2px solid #111827', padding: '10px' }}>
                            <QrCode size={120} color="#111827" />
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', background: '#111827', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>QRIS</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: 'var(--gray-500)', fontSize: '0.85rem', marginBottom: '24px' }}>
                          <Clock size={14} />
                          <span>Masa berlaku QRIS: <strong>04:59</strong></span>
                        </div>

                        <div style={{ background: 'var(--gray-50)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', border: '1px solid var(--gray-200)' }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gray-600)', marginBottom: '8px' }}>PANDUAN PEMBAYARAN:</div>
                          <ol style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--gray-500)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <li>Buka aplikasi e-wallet Anda (GoPay, OVO, ShopeePay, Dana, M-Banking).</li>
                            <li>Pilih menu <strong>Scan / Bayar</strong>.</li>
                            <li>Arahkan kamera ke QR Code di atas.</li>
                            <li>Konfirmasi nominal dan masukkan PIN Anda.</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 4: TICKET SUCCESS */}
                {checkoutStep === 4 && (
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ 
                      width: '64px', height: '64px', borderRadius: '50%', 
                      background: 'var(--green-tint)', color: 'var(--green-primary)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      margin: '0 auto 20px auto', boxShadow: 'var(--shadow-sm)'
                    }}>
                      <Check size={36} />
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>Pembayaran Sukses!</h3>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem', marginBottom: '24px' }}>
                      QuietSpace Pass Anda siap digunakan. Tunjukkan e-tiket di bawah ini pada staf saat tiba di lokasi.
                    </p>

                    {/* Digital Ticket Card */}
                    <div style={{ 
                      background: 'var(--white)', 
                      borderRadius: 'var(--radius-lg)', 
                      border: '2px solid var(--green-primary)', 
                      boxShadow: 'var(--shadow-md)', 
                      overflow: 'hidden',
                      textAlign: 'left',
                      marginBottom: '24px'
                    }}>
                      {/* Ticket Header */}
                      <div style={{ background: 'var(--green-primary)', color: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>QUIETSPACE PASS</div>
                          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{selectedPackage.name}</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                          AKTIF
                        </div>
                      </div>

                      {/* Ticket Body */}
                      <div style={{ padding: '20px', position: 'relative' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>NAMA TAMU</div>
                            <div style={{ fontWeight: 800, color: 'var(--gray-800)', fontSize: '0.9rem' }}>{formData.name}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>LOKASI</div>
                            <div style={{ fontWeight: 800, color: 'var(--gray-800)', fontSize: '0.9rem' }}>{place.name}</div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>TANGGAL KUNJUNGAN</div>
                            <div style={{ fontWeight: 800, color: 'var(--gray-800)', fontSize: '0.9rem' }}>Hari Ini (17 Juni 2026)</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>KODE BOOKING</div>
                            <div style={{ fontWeight: 800, color: 'var(--green-primary)', fontSize: '1.1rem', letterSpacing: '0.05em' }}>{bookingCode}</div>
                          </div>
                        </div>

                        {/* Barcode Mockup */}
                        <div style={{ borderTop: '1px dashed var(--gray-200)', paddingTop: '20px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-block', background: '#f3f4f6', padding: '12px 24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-200)' }}>
                            <div style={{ display: 'flex', gap: '2px', height: '40px', width: '200px', background: '#111827', margin: '0 auto 8px auto', opacity: 0.85, backgroundSize: '12px 100%', backgroundImage: 'linear-gradient(90deg, #fff 2px, transparent 2px, transparent 4px, #fff 4px, #fff 5px, transparent 5px, transparent 8px, #fff 8px, #fff 10px, transparent 10px)' }} />
                            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--gray-600)', letterSpacing: '0.2em' }}>{bookingCode}</div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', display: 'block', marginTop: '10px' }}>Tunjukkan tiket ini kepada Barista untuk verifikasi.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Modal Buttons */}
              <div style={{ 
                padding: '20px 24px', 
                borderTop: '1px solid var(--gray-100)', 
                background: 'var(--gray-50)', 
                display: 'flex', 
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                {checkoutStep === 1 && (
                  <>
                    <button 
                      onClick={() => setIsCheckoutOpen(false)}
                      style={{ 
                        flex: 1, padding: '12px 0', background: 'transparent', 
                        color: 'var(--gray-600)', border: '1px solid var(--gray-300)', 
                        borderRadius: 'var(--radius-md)', fontWeight: 600, 
                        cursor: 'pointer', fontSize: '0.9rem' 
                      }}
                    >
                      Batal
                    </button>
                    <button 
                      onClick={() => {
                        if (formData.name.trim() === '' || formData.phone.trim() === '') {
                          alert('Mohon isi nama dan nomor WhatsApp Anda terlebih dahulu.');
                          return;
                        }
                        setCheckoutStep(2);
                      }}
                      style={{ 
                        flex: 1, padding: '12px 0', background: 'var(--green-primary)', 
                        color: 'var(--white)', border: 'none', 
                        borderRadius: 'var(--radius-md)', fontWeight: 600, 
                        cursor: 'pointer', fontSize: '0.9rem' 
                      }}
                    >
                      Pilih Pembayaran
                    </button>
                  </>
                )}

                {checkoutStep === 2 && (
                  <>
                    <button 
                      onClick={() => setCheckoutStep(1)}
                      style={{ 
                        flex: 1, padding: '12px 0', background: 'transparent', 
                        color: 'var(--gray-600)', border: '1px solid var(--gray-300)', 
                        borderRadius: 'var(--radius-md)', fontWeight: 600, 
                        cursor: 'pointer', fontSize: '0.9rem' 
                      }}
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={() => {
                        setCheckoutStep(3);
                        setIsPaying(true);
                        setTimeout(() => {
                          setIsPaying(false);
                          const randomCode = `QS-${place.name.substring(0, 4).replace(/\s+/g, '').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
                          setBookingCode(randomCode);
                        }, 2500);
                      }}
                      style={{ 
                        flex: 1, padding: '12px 0', background: 'var(--green-primary)', 
                        color: 'var(--white)', border: 'none', 
                        borderRadius: 'var(--radius-md)', fontWeight: 600, 
                        cursor: 'pointer', fontSize: '0.9rem' 
                      }}
                    >
                      Lanjut Bayar
                    </button>
                  </>
                )}

                {checkoutStep === 3 && (
                  <>
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      disabled={isPaying}
                      style={{ 
                        flex: 1, padding: '12px 0', background: 'transparent', 
                        color: isPaying ? 'var(--gray-300)' : 'var(--gray-600)', 
                        border: `1px solid ${isPaying ? 'var(--gray-200)' : 'var(--gray-300)'}`, 
                        borderRadius: 'var(--radius-md)', fontWeight: 600, 
                        cursor: isPaying ? 'not-allowed' : 'pointer', fontSize: '0.9rem' 
                      }}
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={() => {
                        setCheckoutStep(4);
                      }}
                      disabled={isPaying}
                      style={{ 
                        flex: 1, padding: '12px 0', background: isPaying ? 'var(--gray-400)' : 'var(--green-primary)', 
                        color: 'var(--white)', border: 'none', 
                        borderRadius: 'var(--radius-md)', fontWeight: 600, 
                        cursor: isPaying ? 'not-allowed' : 'pointer', fontSize: '0.9rem' 
                      }}
                    >
                      {isPaying ? 'Memproses...' : 'Simulasi Bayar Sukses'}
                    </button>
                  </>
                )}

                {checkoutStep === 4 && (
                  <button 
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setFormData({ name: '', phone: '' });
                      setCheckoutStep(1);
                      setSelectedPackage(null);
                    }}
                    style={{ 
                      width: '100%', padding: '14px 0', background: 'var(--green-primary)', 
                      color: 'var(--white)', border: 'none', 
                      borderRadius: 'var(--radius-md)', fontWeight: 700, 
                      cursor: 'pointer', fontSize: '1rem', textAlign: 'center' 
                    }}
                  >
                    Selesai & Tutup Tiket
                  </button>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
