import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const colleges = [
  { name: 'Harvard', logo: 'https://logo.clearbit.com/harvard.edu' },
  { name: 'Stanford', logo: 'https://logo.clearbit.com/stanford.edu' },
  { name: 'MIT', logo: 'https://logo.clearbit.com/mit.edu' },
  { name: 'Yale', logo: 'https://logo.clearbit.com/yale.edu' },
  { name: 'Princeton', logo: 'https://logo.clearbit.com/princeton.edu' },
  { name: 'Columbia', logo: 'https://logo.clearbit.com/columbia.edu' },
  { name: 'Penn', logo: 'https://logo.clearbit.com/upenn.edu' },
  { name: 'Duke', logo: 'https://logo.clearbit.com/duke.edu' },
  { name: 'Northwestern', logo: 'https://logo.clearbit.com/northwestern.edu' },
  { name: 'Johns Hopkins', logo: 'https://logo.clearbit.com/jhu.edu' },
  { name: 'Brown', logo: 'https://logo.clearbit.com/brown.edu' },
  { name: 'Cornell', logo: 'https://logo.clearbit.com/cornell.edu' },
  { name: 'UC Berkeley', logo: 'https://logo.clearbit.com/berkeley.edu' },
  { name: 'UCLA', logo: 'https://logo.clearbit.com/ucla.edu' },
  { name: 'USC', logo: 'https://logo.clearbit.com/usc.edu' },
];

export const RotatingLogos = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust size and speed based on screen size
  const isMobile = windowWidth < 768;
  const radius = isMobile ? 150 : 250;
  const logoSize = isMobile ? 48 : 64;
  const containerSize = isMobile ? 400 : 600;
  const rotationDuration = isMobile ? 90 : 60; // Slower on mobile

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {/* Rotating circle of logos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative"
          style={{ width: containerSize, height: containerSize }}
          animate={{ rotate: 360 }}
          transition={{
            duration: rotationDuration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {colleges.map((college, index) => {
            const angle = (index / colleges.length) * 360;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={college.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: logoSize,
                  height: logoSize,
                  marginLeft: -logoSize / 2,
                  marginTop: -logoSize / 2,
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <div className="w-full h-full rounded-full bg-white/90 shadow-lg flex items-center justify-center p-2">
                  <img
                    src={college.logo}
                    alt={college.name}
                    className="object-contain"
                    style={{ width: logoSize * 0.75, height: logoSize * 0.75 }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
