'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PlaceCard from '@/components/PlaceCard';
import { placesData } from '@/data';
import { Search, SlidersHorizontal, Check } from 'lucide-react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  
  const [searchQuery, setSearchQuery] = useState(q || '');
  const [noiseFilter, setNoiseFilter] = useState({ 1: false, 2: false, 3: false, 4: false });
  const [categoryFilter, setCategoryFilter] = useState({ 'Coffee Shop': false, 'Coworking Space': false, 'Cafe & Library': false });
  const [facilityFilter, setFacilityFilter] = useState({ powerOutlet: false, wifi: false, ac: false });

  useEffect(() => {
    if (q) {
      setSearchQuery(q);
    }
  }, [q]);

  const handleNoiseChange = (score: number) => {
    setNoiseFilter(prev => ({ ...prev, [score]: !prev[score as keyof typeof prev] }));
  };

  const handleCatChange = (cat: string) => {
    setCategoryFilter(prev => ({ ...prev, [cat]: !prev[cat as keyof typeof prev] }));
  };

  const handleFacChange = (fac: string) => {
    setFacilityFilter(prev => ({ ...prev, [fac]: !prev[fac as keyof typeof prev] }));
  };

  const filteredPlaces = placesData.filter(place => {
    // Search match
    const query = searchQuery.toLowerCase();
    const nameMatch = place.name.toLowerCase().includes(query);
    const addrMatch = place.address.toLowerCase().includes(query);
    const catMatchStr = place.category.toLowerCase().includes(query);
    if (!nameMatch && !addrMatch && !catMatchStr) return false;

    // Noise match
    const activeNoise = Object.keys(noiseFilter).filter(k => noiseFilter[Number(k) as keyof typeof noiseFilter]);
    if (activeNoise.length > 0 && !noiseFilter[place.noiseScore as keyof typeof noiseFilter]) return false;

    // Category match
    const activeCats = Object.keys(categoryFilter).filter(k => categoryFilter[k as keyof typeof categoryFilter]);
    if (activeCats.length > 0) {
      const matchesCat = activeCats.some(cat => place.category.toLowerCase().includes(cat.toLowerCase()));
      if (!matchesCat) return false;
    }

    // Facility match
    if (facilityFilter.powerOutlet && !place.powerOutlet) return false;
    if (facilityFilter.wifi && !place.wifi) return false;
    if (facilityFilter.ac && !place.ac) return false;

    return true;
  });

  return (
    <>
      {/* HERO SECTION - CLEAN AND MINIMAL */}
      <section style={{ paddingTop: '160px', paddingBottom: '60px', background: 'var(--cream)', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--gray-900)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Eksplorasi Tempat
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--gray-500)', marginBottom: '40px', lineHeight: 1.6 }}>
              Temukan ruang tenang dan estetis di Surabaya untuk fokus mengerjakan tugas, skripsi, atau pekerjaan *remote*.
            </p>
            
            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)', color: 'var(--gray-400)' }}>
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Cari kafe, coworking, atau lokasi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', padding: '20px 24px 20px 56px', fontSize: '1.05rem', 
                  background: 'var(--white)', border: '1px solid var(--gray-200)', 
                  borderRadius: 'var(--radius-full)', outline: 'none', 
                  transition: 'all 0.3s', boxShadow: 'var(--shadow-sm)', color: 'var(--gray-800)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE LAYOUT */}
      <section className="section" style={{ paddingTop: '60px', background: 'var(--white)' }}>
        <div className="container">
          <div className="explore-layout">
            
            {/* ELEGANT SIDEBAR FILTER */}
            <aside style={{ position: 'sticky', top: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                <SlidersHorizontal size={20} color="var(--gray-800)" />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--gray-900)', letterSpacing: '-0.01em' }}>Filter</h3>
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Tingkat Kebisingan</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { id: 1, label: 'Sangat Sunyi (Skala 1)' },
                    { id: 2, label: 'Sunyi (Skala 2)' },
                    { id: 3, label: 'Sedang (Skala 3)' },
                    { id: 4, label: 'Ramai (Skala 4)' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--gray-700)', transition: 'color 0.2s' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${noiseFilter[item.id as keyof typeof noiseFilter] ? 'var(--green-primary)' : 'var(--gray-300)'}`, background: noiseFilter[item.id as keyof typeof noiseFilter] ? 'var(--green-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                        {noiseFilter[item.id as keyof typeof noiseFilter] && <Check size={14} color="white" />}
                      </div>
                      <input type="checkbox" checked={noiseFilter[item.id as keyof typeof noiseFilter]} onChange={() => handleNoiseChange(item.id)} style={{ display: 'none' }} /> 
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Kategori Tempat</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { id: 'Coffee Shop', label: 'Coffee Shop' },
                    { id: 'Coworking Space', label: 'Coworking Space' },
                    { id: 'Cafe & Library', label: 'Cafe & Library' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--gray-700)', transition: 'color 0.2s' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${categoryFilter[item.id as keyof typeof categoryFilter] ? 'var(--green-primary)' : 'var(--gray-300)'}`, background: categoryFilter[item.id as keyof typeof categoryFilter] ? 'var(--green-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                        {categoryFilter[item.id as keyof typeof categoryFilter] && <Check size={14} color="white" />}
                      </div>
                      <input type="checkbox" checked={categoryFilter[item.id as keyof typeof categoryFilter]} onChange={() => handleCatChange(item.id)} style={{ display: 'none' }} /> 
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Fasilitas Wajib</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { id: 'powerOutlet', label: 'Colokan Listrik Banyak' },
                    { id: 'wifi', label: 'WiFi Kencang' },
                    { id: 'ac', label: 'Ruangan Ber-AC' }
                  ].map(item => (
                    <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.95rem', color: 'var(--gray-700)', transition: 'color 0.2s' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${facilityFilter[item.id as keyof typeof facilityFilter] ? 'var(--green-primary)' : 'var(--gray-300)'}`, background: facilityFilter[item.id as keyof typeof facilityFilter] ? 'var(--green-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                        {facilityFilter[item.id as keyof typeof facilityFilter] && <Check size={14} color="white" />}
                      </div>
                      <input type="checkbox" checked={facilityFilter[item.id as keyof typeof facilityFilter]} onChange={() => handleFacChange(item.id)} style={{ display: 'none' }} /> 
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <button 
                style={{ width: '100%', padding: '14px', background: 'transparent', color: 'var(--gray-500)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s', border: '1px solid var(--gray-200)', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.color = 'var(--gray-800)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-500)'; }}
                onClick={() => {
                  setNoiseFilter({ 1: false, 2: false, 3: false, 4: false });
                  setCategoryFilter({ 'Coffee Shop': false, 'Coworking Space': false, 'Cafe & Library': false });
                  setFacilityFilter({ powerOutlet: false, wifi: false, ac: false });
                  setSearchQuery('');
                }}
              >
                Hapus Semua Filter
              </button>
            </aside>

            {/* MAIN CONTENT GRID */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--gray-100)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-800)', letterSpacing: '-0.01em' }}>
                  Menampilkan <span style={{ color: 'var(--green-primary)' }}>{filteredPlaces.length}</span> tempat
                </h2>
                
                {/* Sort Dropdown - Clean styling */}
                <select style={{ padding: '10px 16px', borderRadius: 'var(--radius-full)', border: '1px solid var(--gray-200)', background: 'var(--gray-50)', color: 'var(--gray-700)', fontWeight: 500, fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', cursor: 'pointer', appearance: 'none', paddingRight: '40px', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234b5563%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '10px auto' }}>
                  <option>Paling Relevan</option>
                  <option>Rating Tertinggi</option>
                  <option>Paling Sunyi (Skala 1)</option>
                </select>
              </div>
              
              <div className="places-grid explore-grid">
                {filteredPlaces.length > 0 ? (
                  filteredPlaces.map(place => (
                    <PlaceCard key={place.id} place={place} />
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 20px' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--green-tint)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <Search size={28} color="var(--green-primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gray-800)', marginBottom: '12px' }}>Oops, tempat tidak ditemukan</h3>
                    <p style={{ color: 'var(--gray-500)', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                      Kami tidak dapat menemukan tempat yang sesuai dengan kata kunci "{searchQuery}" dan filter pilihanmu.
                    </p>
                    <button 
                      onClick={() => {
                        setNoiseFilter({ 1: false, 2: false, 3: false, 4: false });
                        setCategoryFilter({ 'Coffee Shop': false, 'Coworking Space': false, 'Cafe & Library': false });
                        setFacilityFilter({ powerOutlet: false, wifi: false, ac: false });
                        setSearchQuery('');
                      }}
                      style={{ marginTop: '24px', padding: '12px 24px', background: 'var(--green-primary)', color: 'white', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
                    >
                      Hapus Pencarian
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default function Explore() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '150px', textAlign: 'center' }}>Memuat...</div>}>
      <ExploreContent />
    </Suspense>
  )
}
