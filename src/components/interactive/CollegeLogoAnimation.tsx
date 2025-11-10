import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const colleges = [
  { name: 'Harvard', logo: 'https://logo.clearbit.com/harvard.edu', initial: 'H', color: '#A51C30' },
  { name: 'Stanford', logo: 'https://logo.clearbit.com/stanford.edu', initial: 'S', color: '#8C1515' },
  { name: 'MIT', logo: 'https://logo.clearbit.com/mit.edu', initial: 'MIT', color: '#A31F34' },
  { name: 'Yale', logo: 'https://logo.clearbit.com/yale.edu', initial: 'Y', color: '#00356B' },
  { name: 'Princeton', logo: 'https://logo.clearbit.com/princeton.edu', initial: 'P', color: '#E87722' },
  { name: 'Columbia', logo: 'https://logo.clearbit.com/columbia.edu', initial: 'C', color: '#B9D9EB' },
  { name: 'Penn', logo: 'https://logo.clearbit.com/upenn.edu', initial: 'P', color: '#011F5B' },
  { name: 'Duke', logo: 'https://logo.clearbit.com/duke.edu', initial: 'D', color: '#012169' },
  { name: 'Northwestern', logo: 'https://logo.clearbit.com/northwestern.edu', initial: 'NU', color: '#4E2A84' },
  { name: 'Johns Hopkins', logo: 'https://logo.clearbit.com/jhu.edu', initial: 'JHU', color: '#002D72' },
  { name: 'Brown', logo: 'https://logo.clearbit.com/brown.edu', initial: 'B', color: '#4E3629' },
  { name: 'Cornell', logo: 'https://logo.clearbit.com/cornell.edu', initial: 'C', color: '#B31B1B' },
  { name: 'UC Berkeley', logo: 'https://logo.clearbit.com/berkeley.edu', initial: 'UCB', color: '#003262' },
  { name: 'UCLA', logo: 'https://logo.clearbit.com/ucla.edu', initial: 'UCLA', color: '#2D68C4' },
  { name: 'USC', logo: 'https://logo.clearbit.com/usc.edu', initial: 'USC', color: '#990000' },
  { name: 'NYU', logo: 'https://logo.clearbit.com/nyu.edu', initial: 'NYU', color: '#57068C' },
  { name: 'Boston College', logo: 'https://logo.clearbit.com/bc.edu', initial: 'BC', color: '#98002E' },
  { name: 'Georgetown', logo: 'https://logo.clearbit.com/georgetown.edu', initial: 'GU', color: '#041E42' },
  { name: 'Michigan', logo: 'https://logo.clearbit.com/umich.edu', initial: 'M', color: '#00274C' },
  { name: 'Carnegie Mellon', logo: 'https://logo.clearbit.com/cmu.edu', initial: 'CMU', color: '#C41230' }
];

type AnimationPhase = 'orbit' | 'fade' | 'converge' | 'period' | 'reset';

export const CollegeLogoAnimation = () => {
  const [phase, setPhase] = useState<AnimationPhase>('orbit');
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    // Phase 1: Orbit (0-15s)
    const orbitTimer = setTimeout(() => {
      setPhase('fade');
    }, 15000);

    // Phase 2: Fade (15-17s)
    const fadeTimer = setTimeout(() => {
      setPhase('converge');
    }, 17000);

    // Phase 3: Converge (17-20s)
    const convergeTimer = setTimeout(() => {
      setPhase('period');
    }, 20000);

    // Phase 4: Period (20-21s)
    const periodTimer = setTimeout(() => {
      setPhase('reset');
    }, 21000);

    // Phase 5: Reset (21-22s)
    const resetTimer = setTimeout(() => {
      setPhase('orbit');
      setRotationAngle(0);
    }, 22000);

    return () => {
      clearTimeout(orbitTimer);
      clearTimeout(fadeTimer);
      clearTimeout(convergeTimer);
      clearTimeout(periodTimer);
      clearTimeout(resetTimer);
    };
  }, [phase]);

  // Continuous rotation during orbit and fade phases
  useEffect(() => {
    if (phase === 'orbit' || phase === 'fade') {
      const interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.36) % 360); // 360° in 10s = 0.36° per 10ms
      }, 10);

      return () => clearInterval(interval);
    }
  }, [phase]);

  const radius = 350;

  // Calculate opacity based on phase
  const getOpacity = () => {
    switch (phase) {
      case 'orbit':
        return 1;
      case 'fade':
        return 0.3; // Fading to 30%
      case 'converge':
      case 'period':
      case 'reset':
        return 0; // Fully faded
      default:
        return 1;
    }
  };

  // Calculate scale based on phase
  const getScale = () => {
    switch (phase) {
      case 'converge':
      case 'period':
      case 'reset':
        return 0; // Shrunk to nothing
      default:
        return 1;
    }
  };

  // Calculate position based on phase
  const getPosition = (index: number) => {
    if (phase === 'converge' || phase === 'period' || phase === 'reset') {
      return { x: 0, y: 0 }; // Center
    }

    const angleOffset = (index / colleges.length) * 360;
    const currentAngle = rotationAngle + angleOffset;
    const radian = (currentAngle * Math.PI) / 180;

    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    return { x, y };
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[700px]">
      {/* Animation container - TRANSPARENT BACKGROUND */}
      <div className="relative w-[800px] h-[800px]">

        {/* Orbiting college logos */}
        {colleges.map((college, index) => {
          const position = getPosition(index);

          return (
            <motion.div
              key={college.name}
              className="absolute top-1/2 left-1/2"
              style={{
                marginLeft: '-40px', // Center the 80px logo
                marginTop: '-40px',
              }}
              animate={{
                x: position.x,
                y: position.y,
                scale: getScale(),
                opacity: getOpacity(),
              }}
              transition={{
                duration: phase === 'converge' ? 3 : phase === 'fade' ? 2 : 0,
                ease: phase === 'converge' ? 'easeInOut' : 'linear',
              }}
            >
              {/* Logo container - white circle with shadow */}
              <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden border-2 border-white/20">
                <img
                  src={college.logo}
                  alt={college.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    // Fallback to colored circle with initials
                    const target = e.currentTarget;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = 'none';
                      parent.style.backgroundColor = college.color;
                      parent.innerHTML = `<span class="text-white font-bold text-base">${college.initial}</span>`;
                    }
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Period dot that appears after convergence */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: phase === 'period' ? 1 : 0,
            opacity: phase === 'period' ? 1 : 0,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
          }}
        >
          {/* White period dot */}
          <div className="w-6 h-6 rounded-full bg-white shadow-xl" />
        </motion.div>
      </div>
    </div>
  );
};
