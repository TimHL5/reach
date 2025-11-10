import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TallyButton } from '../ui/TallyButton';

export const PricingSection = () => {
  const features = [
    'Unlimited essay feedback',
    'Application workspace',
    'Common App integration',
    'Financial aid matching',
    'Timeline management',
    'Activity portfolio',
    '24/7 access',
  ];

  const comparison = [
    { service: 'Traditional consultant', cost: '$10,000+' },
    { service: 'Private essay coach', cost: '$2,000-5,000' },
    { service: 'Test prep service', cost: '$1,500+' },
    { service: 'Reach', cost: '$199/year', highlight: true },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-brand relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Radically simple pricing.
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            One plan. All features. No surprises.
          </p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-12 max-w-2xl mx-auto shadow-2xl mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-midnight mb-4">
              One plan. All features. No tricks.
            </h3>

            <div className="mb-6">
              <div className="text-6xl font-bold text-reach-blue mb-2">$199</div>
              <div className="text-xl text-gray-600">per year</div>
              <div className="text-gray-500 mt-2">or $19/month</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center space-x-3"
              >
                <Check size={24} className="text-success flex-shrink-0" />
                <span className="text-lg text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>

          <TallyButton className="w-full mb-4">
            Join Waitlist - Get Early Access
          </TallyButton>
          <noscript>
            <a
              href="https://tally.so/r/J9KGO4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full px-8 py-4 bg-gradient-brand text-white rounded-lg font-semibold text-center mb-4"
            >
              Join Waitlist - Get Early Access
            </a>
          </noscript>

          <div className="text-center">
            <p className="text-success font-semibold mb-2">
              🎉 Early Access Special
            </p>
            <p className="text-gray-600">
              Waitlist members get lifetime 50% discount
            </p>
            <p className="text-2xl font-bold text-reach-blue">$99/year forever</p>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Compare:</h3>
          <div className="space-y-3">
            {comparison.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  item.highlight
                    ? 'bg-white text-reach-blue font-bold'
                    : 'bg-white/10 text-white'
                }`}
              >
                <span className="text-lg">
                  {item.service} {item.highlight && '✨'}
                </span>
                <span className="text-xl font-bold">{item.cost}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
