import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { AuroraBackground } from '../ui/aurora-background';
import { WaitlistButton } from '../ui/waitlist-button';

export const CTASection = () => {
  return (
    <AuroraBackground className="relative section-spacing overflow-hidden" showRadialGradient={true}>
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
            Ready to reach{' '}
            <span className="text-gradient-primary">higher?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/70 mb-12">
            Join 500+ students getting early access
            <br />
            starting Spring 2026
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="flex justify-center mb-12"
          >
            <WaitlistButton size="xl" className="w-full md:w-auto md:min-w-[300px]">
              Join the Waitlist
            </WaitlistButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-3 text-white/60"
          >
            <p className="flex items-center justify-center gap-2">
              <Check size={16} className="text-reach-blue" />
              50% off lifetime for early access
            </p>
            <p className="flex items-center justify-center gap-2">
              <Check size={16} className="text-reach-blue" />
              Help shape the product in beta
            </p>
            <p className="flex items-center justify-center gap-2">
              <Check size={16} className="text-reach-blue" />
              Be first when we launch Spring 2026
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-white/40"
          >
            No spam. Unsubscribe anytime. We respect your privacy.
          </motion.p>
        </motion.div>
      </div>
    </AuroraBackground>
  );
};
