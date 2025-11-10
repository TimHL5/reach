import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const colleges = [
  { name: 'Harvard University', domain: 'harvard.edu', initials: 'H', color: '#A51C30' },
  { name: 'Stanford University', domain: 'stanford.edu', initials: 'S', color: '#8C1515' },
  { name: 'MIT', domain: 'mit.edu', initials: 'MIT', color: '#A31F34' },
  { name: 'Yale University', domain: 'yale.edu', initials: 'Y', color: '#00356B' },
  { name: 'Princeton University', domain: 'princeton.edu', initials: 'P', color: '#FF8F00' },
  { name: 'Columbia University', domain: 'columbia.edu', initials: 'C', color: '#B9D9EB' },
  { name: 'University of Pennsylvania', domain: 'upenn.edu', initials: 'Penn', color: '#011F5B' },
  { name: 'Duke University', domain: 'duke.edu', initials: 'D', color: '#012169' },
  { name: 'Northwestern University', domain: 'northwestern.edu', initials: 'NU', color: '#4E2A84' },
  { name: 'Johns Hopkins', domain: 'jhu.edu', initials: 'JHU', color: '#002D72' },
  { name: 'Brown University', domain: 'brown.edu', initials: 'B', color: '#4E3629' },
  { name: 'Cornell University', domain: 'cornell.edu', initials: 'C', color: '#B31B1B' },
  { name: 'UC Berkeley', domain: 'berkeley.edu', initials: 'UCB', color: '#003262' },
  { name: 'UCLA', domain: 'ucla.edu', initials: 'UCLA', color: '#2774AE' },
  { name: 'USC', domain: 'usc.edu', initials: 'USC', color: '#990000' },
  { name: 'NYU', domain: 'nyu.edu', initials: 'NYU', color: '#57068C' },
  { name: 'Boston College', domain: 'bc.edu', initials: 'BC', color: '#8A1538' },
  { name: 'Georgetown', domain: 'georgetown.edu', initials: 'GT', color: '#041E42' },
  { name: 'University of Michigan', domain: 'umich.edu', initials: 'UM', color: '#00274C' },
  { name: 'Carnegie Mellon', domain: 'cmu.edu', initials: 'CMU', color: '#C41230' },
];

export const CollegeLogoAnimation = () => {
  const [animationPhase, setAnimationPhase] = useState<'orbit' | 'converge' | 'dot'>('orbit');
  const controls = useAnimation();

  useEffect(() => {
    const runAnimation = async () => {
      // Phase 1: Orbit for 15 seconds (3 rotations at 5 seconds each)
      setAnimationPhase('orbit');
      await controls.start({
        rotate: 1080, // 3 full rotations (360 * 3)
        transition: { duration: 15, ease: 'linear' },
      });

      // Phase 2: Converge to center
      setAnimationPhase('converge');
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Phase 3: Show dot
      setAnimationPhase('dot');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Reset and loop
      controls.set({ rotate: 0 });
      runAnimation();
    };

    runAnimation();
  }, [controls]);

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center"
      aria-label="Animation showing top college logos orbiting and converging"
      role="img"
    >
      {/* Orbiting logos */}
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
        {colleges.map((college, index) => {
          const angle = (index / colleges.length) * 360;
          const radius = window.innerWidth < 768 ? 120 : 200;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={college.name}
              className="absolute top-1/2 left-1/2"
              style={{
                x: x - 20,
                y: y - 20,
              }}
              animate={
                animationPhase === 'orbit'
                  ? {
                      rotate: [0, 360],
                      opacity: [0.7, 1, 0.7],
                    }
                  : animationPhase === 'converge'
                  ? {
                      x: -20,
                      y: -20,
                      scale: 0,
                      opacity: 0,
                    }
                  : {
                      x: -20,
                      y: -20,
                      scale: 0,
                      opacity: 0,
                    }
              }
              transition={
                animationPhase === 'orbit'
                  ? {
                      rotate: {
                        duration: 15,
                        ease: 'linear',
                        repeat: 0,
                      },
                      opacity: {
                        duration: 5,
                        ease: 'easeInOut',
                        repeat: 2,
                      },
                    }
                  : {
                      duration: 1.5,
                      ease: 'easeInOut',
                    }
              }
            >
              <CollegeLogo college={college} />
            </motion.div>
          );
        })}

        {/* Center dot that appears after convergence */}
        {animationPhase === 'dot' && (
          <motion.div
            className="absolute top-1/2 left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white shadow-lg"
            style={{ x: -6, y: -6 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}
      </div>

      {/* "reach." text that appears with the dot */}
      {animationPhase === 'dot' && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-4xl md:text-6xl font-bold text-white">
            reach<span className="text-white">.</span>
          </span>
        </motion.div>
      )}
    </div>
  );
};

interface CollegeLogoProps {
  college: {
    name: string;
    domain: string;
    initials: string;
    color: string;
  };
}

const CollegeLogo = ({ college }: CollegeLogoProps) => {
  const [imageError, setImageError] = useState(false);
  const logoUrl = `https://logo.clearbit.com/${college.domain}`;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-xs font-bold"
        style={{ color: college.color }}
        title={college.name}
      >
        {college.initials}
      </div>
    );
  }

  return (
    <div
      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden"
      title={college.name}
    >
      {!imageError ? (
        <img
          src={logoUrl}
          alt={`${college.name} logo`}
          className="w-6 h-6 md:w-8 md:h-8 object-contain"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <span
          className="text-xs md:text-sm font-bold"
          style={{ color: college.color }}
        >
          {college.initials}
        </span>
      )}
    </div>
  );
};
