import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

export const DifferentiationSection = () => {
  const traditional = [
    { icon: '💸', title: '$5,000-$20,000', desc: 'Pay upfront, regardless of outcome' },
    { icon: '⏰', title: 'Schedule-dependent', desc: 'Wait days for feedback' },
    { icon: '📝', title: 'Ghostwritten', desc: '"Consultant voice," not yours' },
    { icon: '📊', title: 'Limited access', desc: '20 hours, then you are on your own' },
    { icon: '🏢', title: 'Exclusive', desc: 'Only for families who can afford it' },
  ];

  const reach = [
    { icon: '✨', title: '$199/year', desc: 'Affordable for almost any family' },
    { icon: '⚡', title: 'Instant feedback', desc: 'Get help at 2am when you are writing' },
    { icon: '🎯', title: 'Your authentic voice', desc: 'AI helps you write better, not writes for you' },
    { icon: '♾️', title: 'Unlimited access', desc: 'Use it as much as you need' },
    { icon: '🌍', title: 'For everyone', desc: 'Guidance should not be a luxury' },
  ];

  return (
    <section id="differentiation" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight mb-6">
            Built different from day one.
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're not consultants with AI bolted on. We're AI-native from the ground up, designed
            for how Gen Z actually works.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Traditional way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-midnight text-white rounded-2xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <X size={32} className="text-error" />
              <h3 className="text-3xl font-bold">The Traditional Way</h3>
            </div>

            <div className="space-y-6">
              {traditional.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex space-x-4"
                >
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-lg mb-1">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reach way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-brand text-white rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <Check size={32} className="text-success" />
                <h3 className="text-3xl font-bold">The Reach Way</h3>
              </div>

              <div className="space-y-6">
                {reach.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex space-x-4"
                  >
                    <span className="text-3xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-lg mb-1">{item.title}</div>
                      <div className="text-white/80 text-sm">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
