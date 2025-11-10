import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { TallyButton } from '../ui/TallyButton';
import { RotatingLogos } from '../interactive/RotatingLogos';

export const HeroSection = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('problem');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-brand">
      {/* Rotating background logos */}
      <RotatingLogos />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <motion.div
            className="w-full lg:w-1/2 text-white space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Make every school within reach.
            </motion.h1>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-2xl lg:text-3xl font-semibold">
                AI-powered college admissions guidance for $199/year.
              </p>
              <p className="text-2xl lg:text-3xl font-semibold">
                Not $10,000.
              </p>
            </motion.div>

            <motion.p
              className="text-lg lg:text-xl text-white/90 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Get expert essay feedback, application strategy, and financial aid matching—the tools wealthy families use—at a price every student can afford.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TallyButton variant="secondary">
                Join the Waitlist
              </TallyButton>
              <noscript>
                <a
                  href="https://tally.so/r/J9KGO4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-white text-reach-blue rounded-lg font-semibold border-2 border-white hover:bg-reach-blue hover:text-white transition-all"
                >
                  Join the Waitlist
                </a>
              </noscript>
              <p className="text-white/90 text-sm">
                Launching Spring 2026 • $199/year
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - BC Gasson Hall image */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img
              src="/gasson.jpg"
              alt="Boston College Gasson Hall"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
              {/* Subtle overlay to blend with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown size={24} />
        </div>
      </motion.button>
    </section>
  );
};
