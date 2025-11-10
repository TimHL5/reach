import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { RotatingLogos } from '../interactive/RotatingLogos';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToNext = () => {
    const nextSection = document.getElementById('problem');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-brand pt-20 pb-12 sm:py-0 lg:pt-0">
      <RotatingLogos />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <motion.div
            className="w-full lg:w-1/2 text-white space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
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
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                AI-powered college admissions guidance for $199/year.
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                Not $10,000.
              </p>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-white/90 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Get expert essay feedback, application strategy, and financial aid matching—the tools wealthy families use—at a price every student can afford.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => navigate('/get-matched')}
              >
                Get My College Matches Free →
              </Button>
              <p className="text-white/90 text-sm text-center sm:text-left">
                5-minute survey • Instant AI recommendations
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative w-full max-w-full sm:max-w-[500px] lg:max-w-[600px]">
              <img
                src="/gasson.jpg"
                alt="Boston College Gasson Hall"
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl sm:rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors z-20 hidden sm:flex"
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
