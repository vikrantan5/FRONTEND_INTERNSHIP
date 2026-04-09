import React from 'react';
import { motion } from 'framer-motion';
import { getMonthName } from '@/utils/dateUtils';

const HERO_IMAGES = {
  0: { url: 'https://images.unsplash.com/photo-1769626124735-80cb3bb31ecb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwd2ludGVyJTIwcGVhayUyMGFkdmVudHVyZXxlbnwwfHx8fDE3NzU3MDM1NjV8MA&ixlib=rb-4.1.0&q=85&w=1920', alt: 'Snow-capped mountains' },
  1: { url: 'https://images.unsplash.com/photo-1772652864400-831e3e3cff2d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxtb3VudGFpbiUyMGNsaW1iaW5nJTIwd2ludGVyJTIwcGVhayUyMGFkdmVudHVyZXxlbnwwfHx8fDE3NzU3MDM1NjV8MA&ixlib=rb-4.1.0&q=85&w=1920', alt: 'Mountain peak golden sunset' },
  2: { url: 'https://images.unsplash.com/photo-1714192967421-6585a0acb2e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwzfHxmb3Jlc3QlMjByaXZlciUyMGhpa2luZyUyMHRyYWlsJTIwc3ByaW5nfGVufDB8fHx8MTc3NTcwMzU2NXww&ixlib=rb-4.1.0&q=85&w=1920', alt: 'Forest river trail' },
  3: { url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=85', alt: 'Spring meadow' },
  4: { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=85', alt: 'Mountain sunset' },
  5: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85', alt: 'Summer vista' },
  6: { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=85', alt: 'Beach sunset' },
  7: { url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&q=85', alt: 'Hiking trail' },
  8: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85', alt: 'Autumn scenery' },
  9: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=85', alt: 'Fall colors' },
  10: { url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=85', alt: 'Late autumn' },
  11: { url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&q=85', alt: 'Winter peaks' },
};

export const HeroBanner = ({ month, year }) => {
  const heroImage = HERO_IMAGES[month];
  const monthName = getMonthName(month).toUpperCase();

  return (
    <motion.div
          className="relative w-full h-[130px] sm:h-[140px] lg:h-[150px] overflow-hidden"
      data-testid="hero-banner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.img
        src={heroImage.url}
        alt={heroImage.alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

      {/* Month/Year overlay */}
      <motion.div
        className="absolute bottom-0 right-0 px-6 py-3 sm:px-10 sm:py-4"
        style={{
          background: 'linear-gradient(135deg, rgba(14,165,233,0.9) 0%, rgba(2,132,199,0.95) 100%)',
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
        }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="text-right pl-6">
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white/90 tracking-tight" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {year}
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-none" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {monthName}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroBanner;
