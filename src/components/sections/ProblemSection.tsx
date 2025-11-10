import { motion } from 'framer-motion';
import { TrendingDown, DollarSign, Users } from 'lucide-react';
import { CostCalculator } from '../interactive/CostCalculator';

export const ProblemSection = () => {
  const stats = [
    { icon: TrendingDown, value: '5%', label: 'Acceptance rate at top schools' },
    { icon: DollarSign, value: '$10,000', label: 'Average consultant cost' },
    { icon: Users, value: '500+', label: 'Students per counselor' },
  ];

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight mb-6">
            College admissions is broken.
          </h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              Acceptance rates are dropping. Competition is intensifying. And the only reliable path
              to standing out costs more than most families can afford.
            </p>
            <p>
              Wealthy families pay <strong>$10,000+</strong> for consultants who provide essay
              feedback, application strategy, portfolio building, timeline management, and financial
              aid guidance.
            </p>
            <p className="text-xl font-semibold text-midnight">
              Everyone else? You're on your own.
            </p>
            <p className="text-2xl font-bold text-reach-blue">
              That's not fair. And we're fixing it.
            </p>
          </div>
        </motion.div>

        {/* Animated Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-brand rounded-full mb-4">
                <stat.icon size={32} className="text-white" />
              </div>
              <div className="text-4xl font-bold text-reach-blue mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Cost Calculator */}
        <CostCalculator />
      </div>
    </section>
  );
};
