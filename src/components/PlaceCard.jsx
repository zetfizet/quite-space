import { Star, Wifi, Wind, Plug, MapPin } from 'lucide-react';
import Link from 'next/link';
import { getNoiseInfo } from '../data';

export default function PlaceCard({ place }) {
  const n = getNoiseInfo(place.noiseScore);

  return (
    <div className="place-card">
      <div className="place-img">
        <img src={place.photo} alt={place.name} loading="lazy" />
        <span className={`place-badge ${place.noiseScore <= 2 ? 'quiet' : 'medium'}`}>
          {n.label}
        </span>
        {place.isFeatured && (
          <span className="place-badge featured">⭐ Featured</span>
        )}
        {place.crowdStatus && (
          <span className={`place-badge crowd ${place.crowdStatus}`}>
            {place.crowdStatus === 'sepi' ? '🟢 Agak Sepi' : place.crowdStatus === 'sedang' ? '🟡 Cukup Penuh' : '🔴 Hampir Penuh'}
          </span>
        )}
      </div>
      <div className="place-body">
        <div className="place-category">{place.category}</div>
        <div className="place-name">{place.name}</div>
        <div className="place-address">{place.address}</div>
        
        <div className="place-meta">
          <div className="place-rating">
            <Star size={16} fill="#F59E0B" color="#F59E0B" />
            {place.rating} <span style={{color: 'var(--gray-400)', fontWeight: 400}}>({place.reviewCount})</span>
          </div>
          <div className="noise-indicator">
            <div className="noise-bars">
              {n.bars.map((h, i) => (
                <div key={i} className="noise-bar" style={{height: `${h}px`, background: n.color}} />
              ))}
            </div>
            <span className="noise-label" style={{color: n.color}}>{n.label}</span>
          </div>
        </div>
        
        <div className="place-info-row">
          <span className="place-price">{place.priceRange}</span>
          <span className="place-hours">{place.hours}</span>
        </div>
        
        <div className="place-tags">
          {place.tags.map(t => (
            <span key={t} className="place-tag">{t}</span>
          ))}
        </div>
        
        <div className="place-facilities">
          {place.wifi && <div className="facility"><Wifi size={16} />WiFi</div>}
          {place.ac && <div className="facility"><Wind size={16} />AC</div>}
          {place.powerOutlet && <div className="facility"><Plug size={16} />Colokan</div>}
        </div>
        
        <div className="place-actions">
          <button className="place-cta" onClick={() => window.open(place.mapsUrl, '_blank')}>
            <MapPin size={14} />
            Lihat di Maps
          </button>
          <Link className="place-cta-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} href={`/place/${place.id}`}>
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
