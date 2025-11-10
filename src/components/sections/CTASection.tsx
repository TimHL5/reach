import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { TallyButton } from '../ui/TallyButton';

export const CTASection = () => {
  return (
    <section id="cta" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-midnight mb-6">
            Ready to reach higher?
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Join 200+ students getting early access to Reach this Spring.
          </p>

          <TallyButton className="text-lg">
            Join the Waitlist
          </TallyButton>
          <noscript>
            <a
              href="https://tally.so/r/J9KGO4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-brand text-white rounded-lg font-semibold text-lg"
            >
              Join the Waitlist
            </a>
          </noscript>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500"
          >
            <Lock size={16} />
            <span>We respect your privacy. Unsubscribe anytime.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-gray-600 italic"
          >
            Built by students, for students.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
