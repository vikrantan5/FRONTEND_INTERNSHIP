import React from 'react';
import { getMonthName } from '@/utils/dateUtils';

const HERO_IMAGES = {
  0: {
    url: 'https://images.unsplash.com/photo-1769626124735-80cb3bb31ecb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwd2ludGVyJTIwcGVhayUyMGFkdmVudHVyZXxlbnwwfHx8fDE3NzU3MDM1NjV8MA&ixlib=rb-4.1.0&q=85&w=1920',
    alt: 'Snow-capped mountains under a clear blue sky'
  },
  1: {
    url: 'https://images.unsplash.com/photo-1772652864400-831e3e3cff2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwd2ludGVyJTIwcGVhayUyMGFkdmVudHVyZXxlbnwwfHx8fDE3NzU3MDM1NjV8MA&ixlib=rb-4.1.0&q=85&w=1920',
    alt: 'Snow-covered mountain peak illuminated by golden sunset light'
  },
  2: {
    url: 'https://images.unsplash.com/photo-1714192967421-6585a0acb2e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxmb3Jlc3QlMjByaXZlciUyMGhpa2luZyUyMHRyYWlsJTIwc3ByaW5nfGVufDB8fHx8MTc3NTcwMzU2NXww&ixlib=rb-4.1.0&q=85&w=1920',
    alt: 'Forest river hiking trail'
  },
  3: {
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=85',
    alt: 'Spring meadow with wildflowers'
  },
  4: {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85',
    alt: 'Mountain landscape at sunset'
  },
  5: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85',
    alt: 'Summer mountain vista'
  },
  6: {
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=85',
    alt: 'Beach sunset in summer'
  },
  7: {
    url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=85',
    alt: 'Mountain hiking trail in summer'
  },
  8: {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85',
    alt: 'Autumn mountain scenery'
  },
  9: {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=85',
    alt: 'Fall forest colors'
  },
  10: {
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85',
    alt: 'Late autumn landscape'
  },
  11: {
    url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&q=85',
    alt: 'Winter mountain peaks'
  }
};

export const HeroBanner = ({ month, year }) => {
  const heroImage = HERO_IMAGES[month];
  const monthName = getMonthName(month).toUpperCase();
  
  return (
    <div className="relative w-full h-[35vh] sm:h-[40vh] overflow-hidden" data-testid="hero-banner">
      <img
        src={heroImage.url}
        alt={heroImage.alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      
      {/* Month/Year overlay */}
      <div className="absolute bottom-0 right-0 bg-[#0EA5E9] text-white px-8 py-6 sm:px-12 sm:py-8" style={{
        clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)'
      }}>
        <div className="text-right">
          <div className="text-2xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {year}
          </div>
          <div className="text-3xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {monthName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;