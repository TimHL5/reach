import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 20 top universities with logo URLs
const colleges = [
  { name: 'Harvard', logo: 'https://logo.clearbit.com/harvard.edu', color: '#A51C30' },
  { name: 'Stanford', logo: 'https://logo.clearbit.com/stanford.edu', color: '#8C1515' },
  { name: 'MIT', logo: 'https://logo.clearbit.com/mit.edu', color: '#A31F34' },
  { name: 'Yale', logo: 'https://logo.clearbit.com/yale.edu', color: '#00356B' },
  { name: 'Princeton', logo: 'https://logo.clearbit.com/princeton.edu', color: '#E87722' },
  { name: 'Columbia', logo: 'https://logo.clearbit.com/columbia.edu', color: '#B9D9EB' },
  { name: 'Penn', logo: 'https://logo.clearbit.com/upenn.edu', color: '#011F5B' },
  { name: 'Duke', logo: 'https://logo.clearbit.com/duke.edu', color: '#012169' },
  { name: 'Northwestern', logo: 'https://logo.clearbit.com/northwestern.edu', color: '#4E2A84' },
  { name: 'Johns Hopkins', logo: 'https://logo.clearbit.com/jhu.edu', color: '#002D72' },
  { name: 'Brown', logo: 'https://logo.clearbit.com/brown.edu', color: '#4E3629' },
  { name: 'Cornell', logo: 'https://logo.clearbit.com/cornell.edu', color: '#B31B1B' },
  { name: 'UC Berkeley', logo: 'https://logo.clearbit.com/berkeley.edu', color: '#003262' },
  { name: 'UCLA', logo: 'https://logo.clearbit.com/ucla.edu', color: '#2D68C4' },
  { name: 'USC', logo: 'https://logo.clearbit.com/usc.edu', color: '#990000' },
  { name: 'NYU', logo: 'https://logo.clearbit.com/nyu.edu', color: '#57068C' },
  { name: 'Boston College', logo: 'https://logo.clearbit.com/bc.edu', color: '#98002E' },
  { name: 'Georgetown', logo: 'https://logo.clearbit.com/georgetown.edu', color: '#041E42' },
  { name: 'Michigan', logo: 'https://logo.clearbit.com/umich.edu', color: '#00274C' },
  { name: 'Carnegie Mellon', logo: 'https://logo.clearbit.com/cmu.edu', color: '#C41230' }
];

export const CollegeLogoAnimation = () => {
  const [isConverging, setIsConverging] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    // Handle window resize for responsive radius
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Continuous rotation - 360 degrees in 10 seconds = 0.36 degrees per 10ms
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 0.36) % 360);
    }, 10);

    // Trigger convergence after 20 seconds (2 full rotations)
    const convergenceTimer = setTimeout(() => {
      setIsConverging(true);

      // Reset animation after convergence completes (2.5s convergence + 2s pause)
      setTimeout(() => {
        setIsConverging(false);
        setRotationAngle(0);
      }, 4500);
    }, 20000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(rotationInterval);
      clearTimeout(convergenceTimer);
    };
  }, []);

  // Responsive sizing
  const radius = windowWidth < 768 ? 150 : 350;
  const containerSize = radius * 2 + 160; // radius * 2 + logo size (80px) + padding

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
      aria-label="Animation showing top college logos orbiting and converging"
      role="img"
    >
      {/* Orbiting logos */}
      <div
        className="relative"
        style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
      >
        {colleges.map((college, index) => {
          // Calculate position on circle
          const angleOffset = (index / colleges.length) * 360;
          const currentAngle = rotationAngle + angleOffset;
          const radian = (currentAngle * Math.PI) / 180;

          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <motion.div
              key={college.name}
              className="absolute top-1/2 left-1/2"
              style={{
                x: isConverging ? 0 : x,
                y: isConverging ? 0 : y,
                marginLeft: '-40px', // Center the 80px logo
                marginTop: '-40px',
              }}
              animate={{
                scale: isConverging ? 0.1 : 1,
                opacity: isConverging ? 0 : 1,
              }}
              transition={{
                duration: isConverging ? 2.5 : 0,
                ease: 'easeInOut',
              }}
            >
              {/* Logo container */}
              <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden">
                <img
                  src={college.logo}
                  alt={`${college.name} logo`}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    // Fallback to colored circle with initial
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.backgroundColor = college.color;
                      parent.innerHTML = `<span class="text-white font-bold text-xl">${college.name.charAt(0)}</span>`;
                    }
                  }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
