'use client';

import Link from 'next/link';
import { Users, ShieldCheck, MapPin, Coffee, ArrowRight, BookOpen, Compass, Code } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Mufrih Fakhir",
      dept: "Teknik Informatika ITS",
      initial: "MF",
      color: "#0369A1", // Sky Blue
      bgColor: "#E0F2FE"
    },
    {
      name: "Rafie Zaidan Umara",
      dept: "Teknik Informatika ITS",
      initial: "RZ",
      color: "var(--green-primary)", // Green
      bgColor: "var(--green-tint)"
    },
    {
      name: "Nona Auliya Wijaya",
      dept: "Teknik Informatika ITS",
      initial: "NA",
      color: "#DC2626", // Red/Rose
      bgColor: "#FEE2E2"
    },
    {
      name: "Dzikrina Hidayani Martin",
      dept: "Teknik Informatika ITS",
      initial: "DH",
      color: "#D97706", // Amber
      bgColor: "#FEF3C7"
    }
  ];

  const coreValues = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Informasi Terverifikasi",
      desc: "Kami mengurasi data fasilitas kafe seperti colokan listrik, WiFi, dan AC secara langsung agar Anda terhindar dari zonk saat tiba."
    },
    {
      icon: <Compass size={28} />,
      title: "Skala Kebisingan Akurat",
      desc: "Setiap tempat dikategorikan dengan Noise Score (Skala 1-4) dari Sangat Sunyi hingga Ramai agar sesuai dengan preferensi fokus Anda."
    },
    {
      icon: <Coffee size={28} />,
      title: "Kemitraan Produktif",
      desc: "Membantu UMKM & kafe lokal memaksimalkan kapasitas tempat duduk mereka di jam-jam sepi lewat program produktif hemat mahasiswa."
    }
  ];

  return (
    <div style={{ background: 'var(--cream)', paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
      
      {/* 1. HERO SECTION */}
      <section className="container" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ 
          background: 'var(--green-tint)', 
          color: 'var(--green-primary)', 
          padding: '8px 16px', 
          borderRadius: 'var(--radius-full)', 
          fontSize: '0.85rem', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          display: 'inline-block',
          marginBottom: '16px'
        }}>
          Tentang QuietSpace
        </span>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 800, 
          color: 'var(--gray-900)', 
          maxWidth: '800px', 
          margin: '0 auto 24px auto', 
          lineHeight: 1.2 
        }}>
          Membantu Mahasiswa & Remote Worker Surabaya Menemukan Ruang Fokus Terbaik
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: 'var(--gray-500)', 
          maxWidth: '650px', 
          margin: '0 auto 40px auto', 
          lineHeight: 1.6 
        }}>
          QuietSpace adalah platform berbasis Surabaya yang dikembangkan oleh mahasiswa Teknik Informatika ITS untuk mengatasi keresahan pencarian tempat belajar dan bekerja yang kondusif.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link href="/explore" className="nav-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', fontSize: '1.05rem' }}>
            Mulai Cari Tempat <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 2. VISI & MISI / CORE VALUES */}
      <section style={{ background: 'var(--white)', padding: '80px 0', borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)', marginBottom: '80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px' }}>Mengapa QuietSpace?</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>Kami berfokus pada solusi praktis untuk mendukung kenyamanan kerja remote dan pengerjaan tugas skripsi/kuliah sehari-hari.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {coreValues.map((val, idx) => (
              <div key={idx} style={{ 
                padding: '32px', 
                borderRadius: 'var(--radius-xl)', 
                border: '1px solid var(--gray-100)', 
                background: 'var(--white)', 
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ 
                  color: 'var(--green-primary)', 
                  background: 'var(--green-tint)', 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)' }}>{val.title}</h3>
                <p style={{ color: 'var(--gray-500)', fontSize: '0.95rem', lineHeight: 1.6 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MEET THE TEAM SECTION */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ 
            color: 'var(--green-primary)', 
            fontWeight: 700, 
            fontSize: '0.9rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            display: 'block',
            marginBottom: '8px'
          }}>
            Tim Pengembang
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px' }}>
            Kreator di Balik QuietSpace
          </h2>
          <p style={{ color: 'var(--gray-500)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Mahasiswa Teknik Informatika Institut Teknologi Sepuluh Nopember (ITS) yang berdedikasi membangun ruang fokus digital untuk generasi produktif.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '32px' 
        }}>
          {teamMembers.map((member, idx) => (
            <div key={idx} style={{ 
              background: 'var(--white)', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid var(--gray-200)', 
              boxShadow: 'var(--shadow-sm)', 
              padding: '32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}>
              {/* Custom Initial Avatar */}
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: member.bgColor, 
                color: member.color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '2rem', 
                fontWeight: 800, 
                marginBottom: '20px',
                boxShadow: 'var(--shadow-sm)',
                flexShrink: 0
              }}>
                {member.initial}
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '8px' }}>
                {member.name}
              </h3>
              
              <div style={{ fontSize: '0.9rem', color: 'var(--green-primary)', fontWeight: 700 }}>
                {member.dept}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA / PENUTUP */}
      <section className="container">
        <div style={{ 
          background: 'var(--green-dark)', 
          color: 'var(--white)', 
          borderRadius: 'var(--radius-2xl)', 
          padding: '56px 40px', 
          textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--green-tint)', marginBottom: '16px' }}>Siap Menemukan Tempat Nugas Impianmu?</h2>
            <p style={{ opacity: 0.85, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
              Temukan kafe terdekat dengan fasilitas prioritas WiFi, colokan listrik, dan tingkat kebisingan yang Anda butuhkan sekarang.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/explore" className="nav-cta" style={{ background: 'var(--green-primary)', color: 'var(--white)', padding: '16px 32px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1rem', border: 'none' }}>
                Cari Tempat Sekarang <ArrowRight size={16} />
              </Link>
              <Link href="/partners" className="nav-cta" style={{ background: 'transparent', color: 'var(--white)', border: '2px solid var(--white)', padding: '14px 30px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                Daftarkan Kafe Anda
              </Link>
            </div>
          </div>
          
          {/* Subtle background decoration */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(82,183,136,0.1)' }} />
          <div style={{ position: 'absolute', bottom: '-150px', left: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(82,183,136,0.1)' }} />
        </div>
      </section>

    </div>
  );
}
