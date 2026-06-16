import { Bell } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{ color: 'var(--white)' }}>
              <Bell size={32} />
              QuietSpace
            </div>
            <p>Platform pencarian cafe & coworking space berdasarkan noise level untuk mahasiswa dan pekerja remote di Indonesia.</p>
          </div>
          <div>
            <h4>Platform</h4>
            <ul>
              <li><Link href="/explore">Cari Tempat</Link></li>
              <li><Link href="/#features">Fitur</Link></li>
              <li><Link href="/#how-it-works">Cara Kerja</Link></li>
              <li><Link href="/#testimonials">Testimoni</Link></li>
            </ul>
          </div>
          <div>
            <h4>Untuk Mitra</h4>
            <ul>
              <li><Link href="#">Daftar Mitra</Link></li>
              <li><Link href="#">Dashboard</Link></li>
              <li><Link href="#">Promosi</Link></li>
              <li><Link href="#">Statistik</Link></li>
            </ul>
          </div>
          <div>
            <h4>Lainnya</h4>
            <ul>
              <li><Link href="#">Tentang Kami</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Kontak</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2024 QuietSpace. All rights reserved.</div>
          <div>Made with ❤️ in Surabaya</div>
        </div>
      </div>
    </footer>
  );
}
