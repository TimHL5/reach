import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GlowingEffect } from '../ui/glowing-effect';

export const ProblemSection = () => {
  const stats = [
    { number: '$10,000+', label: 'Average consultant cost' },
    { number: '<5%', label: 'Acceptance rate at top schools' },
    { number: '$0', label: 'Guidance for most students' },
  ];

  const StatCard = ({ number, label, delay }: { number: string; label: string; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
        className="relative min-h-[240px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl p-8"
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
          variant="default"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
          <div className="text-5xl md:text-6xl font-bold text-gradient-primary">
            {number}
          </div>
          <div className="text-base md:text-lg text-white/70 text-center max-w-[200px]">
            {label}
          </div>
        </div>
      </motion.div>
    );
  };

  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, margin: '-100px' });

  return (
    <section id="problem" className="section-spacing bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            The System Is Broken
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16 md:mb-20">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} delay={idx * 0.15} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Wealthy families pay thousands for guidance.
          </p>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Everyone else figures it out alone.
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gradient-primary mt-8">
            That ends now.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
