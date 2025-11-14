import { motion } from 'framer-motion';
import { TrackIcon, BuildIcon, ApplyIcon, EnrollIcon } from '../ui/journey-icons';

export const HowItWorksSection = () => {
  const journeyStages = [
    {
      icon: TrackIcon,
      title: 'Track',
      period: 'Freshman-Junior',
      description: 'Monitor your academic progress, extracurriculars, and achievements as you build your foundation.',
    },
    {
      icon: BuildIcon,
      title: 'Build',
      period: 'Junior-Senior',
      description: 'Craft compelling essays and refine your story with AI-powered feedback that keeps your authentic voice.',
    },
    {
      icon: ApplyIcon,
      title: 'Apply',
      period: 'Senior Fall',
      description: 'Submit polished applications to your dream schools with confidence and track every deadline.',
    },
    {
      icon: EnrollIcon,
      title: 'Enroll',
      period: 'Senior Spring',
      description: 'Celebrate your acceptances and make the final decision on where you\'ll spend the next four years.',
    },
  ];

  return (
    <section id="journey" className="section-spacing bg-midnight relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: '#FAFBFC' }}
          >
            Your College Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="text-lg md:text-xl"
            style={{ color: 'rgba(250, 251, 252, 0.7)' }}
          >
            From freshman year to enrollment day, we're with you every step
          </motion.p>
        </div>

        {/* Journey Cards - Horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journeyStages.map((stage, idx) => {
            const IconComponent = stage.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <IconComponent size={56} />
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-2 text-center"
                  style={{ color: '#FAFBFC' }}
                >
                  {stage.title}
                </h3>

                {/* Period */}
                <p
                  className="text-sm mb-4 text-center font-medium"
                  style={{ color: 'rgba(250, 251, 252, 0.6)' }}
                >
                  {stage.period}
                </p>

                {/* Description */}
                <p
                  className="text-base leading-relaxed text-center"
                  style={{ color: 'rgba(250, 251, 252, 0.75)' }}
                >
                  {stage.description}
                </p>

                {/* Connector line (hidden on mobile, shown between cards on desktop) */}
                {idx < journeyStages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
