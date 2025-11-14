import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { AuroraBackground } from '../ui/aurora-background';
import { LiquidButton } from '../ui/liquid-glass-button';

export const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('problem');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const headline = "Remember staring at your Common App essay at 2am, wondering if it's good enough?";
  const words = headline.split(' ');

  return (
    <AuroraBackground className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.1,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="inline-block mr-2 md:mr-3"
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl font-regular mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + words.length * 0.1 + 0.3,
              ease: [0.33, 1, 0.68, 1],
            }}
            style={{
              color: 'rgba(255, 255, 255, 0.70)',
            }}
          >
            We do too.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3 + words.length * 0.1 + 0.6,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="flex flex-col items-center gap-6"
          >
            <LiquidButton
              size="xxl"
              className="animate-pulse-gentle"
              onClick={() => {
                const waitlistSection = document.getElementById('cta');
                waitlistSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Join 500+ Students on the Waitlist
            </LiquidButton>

            <motion.button
              onClick={scrollToNext}
              className="text-base text-white/60 hover:text-white/90 transition-colors duration-300 underline-offset-4 hover:underline"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              See how it works ↓
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors z-20 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to next section"
      >
        <span className="text-sm tracking-wide">Scroll to explore</span>
        <ArrowDown size={20} />
      </motion.button>
    </AuroraBackground>
  );
};
