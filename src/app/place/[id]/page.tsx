'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { placesData, getNoiseInfo } from '@/data';
import { MapPin, Star, Wifi, Wind, Plug, Clock, Users, Coffee, ArrowLeft } from 'lucide-react';
import PlaceCard from '@/components/PlaceCard';

export default function PlaceDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const place = placesData.find(p => p.id === parseInt(id));

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
            <div style={{ background: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--green-tint)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                    D
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--gray-800)', fontSize: '1.05rem' }}>Dimas A.</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Freelance Designer • 2 minggu lalu</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--yellow)" color="var(--yellow)" />)}
                </div>
              </div>
              <p style={{ color: 'var(--gray-700)', lineHeight: 1.6, fontSize: '1rem' }}>
                "Wifinya super stabil, sempat nyoba speedtest tembus 50mbps. Colokan listrik juga melimpah di area indoor. Sangat *recommended* buat WFC seharian dan upload file besar tanpa takut putus."
              </p>
            </div>

            <div style={{ background: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                    S
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--gray-800)', fontSize: '1.05rem' }}>Siti N.</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Mahasiswa Akhir • 1 bulan lalu</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(4)].map((_, i) => <Star key={i} size={16} fill="var(--yellow)" color="var(--yellow)" />)}
                  <Star size={16} color="var(--gray-300)" />
                </div>
              </div>
              <p style={{ color: 'var(--gray-700)', lineHeight: 1.6, fontSize: '1rem' }}>
                "Ketinggian mejanya ergonomis banget buat ngetik berjam-jam tanpa bikin punggung sakit. Cuma kalau datang lewat jam 2 siang agak lumayan berisik karena banyak yang nongkrong. Mending datang pagi kalau mau nugas."
              </p>
            </div>
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
              <Link href="/explore" className="nav-cta" style={{ background: 'transparent', color: 'var(--green-primary)', border: '2px solid var(--green-primary)' }}>
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

      </div>
    </div>
  );
}
