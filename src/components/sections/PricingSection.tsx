import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { LiquidButton } from '../ui/liquid-glass-button';

export const PricingSection = () => {
  const features = [
    'Unlimited AI essay feedback',
    'Complete application workspace',
    'Activity tracker & deadline management',
    'Scholarship matching & discovery',
    'Common App integration',
    '24/7 access (no business hours)',
    'Your authentic voice preserved',
  ];

  const ComparisonCard = ({
    title,
    price,
    features,
    highlight = false,
  }: {
    title: string;
    price: string;
    features: { text: string; negative?: boolean; positive?: boolean }[];
    highlight?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={`glass-card p-8 ${highlight ? 'ring-2 ring-reach-blue' : ''}`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gradient-primary mb-6">{price}</div>
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-white/70">
            {feature.negative ? (
              <span className="text-error">✗</span>
            ) : (
              <span className="text-success">✓</span>
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="pricing" className="section-spacing bg-gradient-to-b from-midnight via-black to-midnight relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Plans that make sense
          </h2>
          <p className="text-xl md:text-2xl text-white/60">
            $199/year vs $10,000+ consultants
          </p>
        </motion.div>

        {/* Main pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-2xl mx-auto mb-20"
        >
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Sparkle/glow effect background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-reach-blue/20 to-reach-purple/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-reach-blue to-reach-purple text-white text-sm font-semibold mb-6">
                  Launch Special - 50% Off
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  Reach Premium
                </h3>

                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-gradient-primary">
                    $199
                  </span>
                  <span className="text-2xl text-white/60">/year</span>
                </div>

                <p className="text-white/60 mb-8">
                  or $19/month • Cancel anytime
                </p>
              </div>

              <LiquidButton
                size="xl"
                className="w-full mb-8"
                onClick={() => {
                  const ctaSection = document.getElementById('cta');
                  ctaSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Join Waitlist - Get 50% Off
              </LiquidButton>

              <div className="space-y-4 mb-8">
                <p className="text-sm text-white/50 text-center mb-6 uppercase tracking-wide">
                  Everything you need:
                </p>

                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, ease: [0.33, 1, 0.68, 1] }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-reach-blue to-reach-purple flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-white/50">
                  30-day money-back guarantee • Built by students, for students
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison section */}
        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
          >
            Compare to Traditional Consulting
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            <ComparisonCard
              title="Traditional Consulting"
              price="$5,000-$20,000"
              features={[
                { text: 'Limited hours', negative: true },
                { text: 'Business hours only', negative: true },
                { text: 'Schedule dependent', negative: true },
                { text: 'May ghostwrite', negative: true },
              ]}
            />

            <ComparisonCard
              title="Reach"
              price="$199/year"
              features={[
                { text: 'Unlimited access', positive: true },
                { text: '24/7 availability', positive: true },
                { text: 'Instant feedback', positive: true },
                { text: 'Your authentic voice', positive: true },
              ]}
              highlight
            />
          </div>
        </div>
      </div>
    </section>
  );
};
