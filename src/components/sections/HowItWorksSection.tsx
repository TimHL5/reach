import { motion } from 'framer-motion';
import { VerticalCutReveal } from '../ui/vertical-cut-reveal';

export const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'You Write First',
      description: 'Start with your story in your own words. We never write for you.',
    },
    {
      number: '02',
      title: 'AI Analyzes Deeply',
      description: 'Get specific, actionable feedback on what works and what doesn\'t.',
    },
    {
      number: '03',
      title: 'You Improve',
      description: 'Revise with confidence. Your voice stays intact, just clearer.',
    },
  ];

  return (
    <section id="how-it-works" className="section-spacing bg-gradient-to-b from-black via-midnight to-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={false}
            containerClassName="justify-center mb-8"
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 40,
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-primary"
          >
            Your AI Copilot For College Applications
          </VerticalCutReveal>
        </div>

        {/* Three principles with timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-reach-blue/0 via-reach-blue/50 to-reach-blue/0" />

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.2,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="relative flex items-start gap-8 md:gap-12"
                >
                  {/* Number circle */}
                  <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-reach-blue to-reach-purple flex items-center justify-center shadow-[0_0_40px_rgba(102,126,234,0.4)]">
                    <span className="text-xl md:text-2xl font-bold">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Simple visual mockup suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mt-24 max-w-5xl mx-auto glass-card p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Essay preview */}
            <div className="space-y-4">
              <div className="text-sm font-semibold text-white/50 tracking-wide uppercase">Your Draft</div>
              <div className="space-y-3 text-white/60 font-mono text-sm leading-relaxed">
                <p className="hover:bg-white/5 p-2 rounded transition-colors">
                  Growing up, I always loved science...
                </p>
                <p className="hover:bg-white/5 p-2 rounded transition-colors">
                  My passion for learning drove me to...
                </p>
                <p className="hover:bg-white/5 p-2 rounded transition-colors">
                  I believe this experience taught me...
                </p>
              </div>
            </div>

            {/* Right: AI feedback */}
            <div className="space-y-4">
              <div className="text-sm font-semibold text-white/50 tracking-wide uppercase">AI Feedback</div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-reach-blue/10 to-reach-purple/10 border border-white/10">
                  <div className="text-xs font-semibold text-reach-blue mb-2">Show, don't tell</div>
                  <p className="text-sm text-white/80">
                    "Loved science" is vague. What specific moment sparked this passion?
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-reach-blue/10 to-reach-purple/10 border border-white/10">
                  <div className="text-xs font-semibold text-reach-blue mb-2">Add specificity</div>
                  <p className="text-sm text-white/80">
                    What did you actually do? Include concrete details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
