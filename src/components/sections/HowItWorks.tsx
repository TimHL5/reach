import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const APPLICATION_STAGES = [
  {
    id: 'track',
    title: 'Track',
    phase: 'Freshman-Junior Year',
    tagline: 'Document your journey from day one',
    description: 'Track extracurriculars, leadership roles, awards, and projects. Build a comprehensive portfolio that tells your complete story.',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'draft',
    title: 'Draft',
    phase: 'Summer before Senior Year',
    tagline: 'Write essays with intelligent feedback',
    description: 'Get instant, specific feedback on Common App essays. Our AI identifies weak spots and suggests improvements while preserving your authentic voice.',
    icon: '✍️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'refine',
    title: 'Refine',
    phase: 'Fall Senior Year',
    tagline: 'Iterate until it is perfect',
    description: 'Compare drafts, track improvements, and see your writing evolve. Know when your essay is truly ready to submit.',
    icon: '✨',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'apply',
    title: 'Apply',
    phase: 'Winter Senior Year',
    tagline: 'One-click sync to Common App',
    description: 'Stop copying and pasting. Sync your Reach profile directly to Common App and apply to schools in minutes, not hours.',
    icon: '🚀',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'fund',
    title: 'Fund',
    phase: 'Acceptance → Enrollment',
    tagline: 'Find money you are leaving on the table',
    description: 'Auto-match with scholarships and financial aid based on your profile. Our students find thousands in aid they didn\'t know existed.',
    icon: '💰',
    color: 'from-green-500 to-emerald-500',
  },
];

export const HowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'], // Start animating earlier
  });

  // Fly in from RIGHT side, fly out to LEFT side
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [200, 0, 0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative py-32 min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            Everything you need to reach
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              your dream schools.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
          >
            From freshman year to acceptance, Reach is the workspace where you build your application
            with AI guidance at every step.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-white/50 text-sm"
          >
            <span>Scroll to explore the journey</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>

        {/* Cards Container - with scroll-triggered animation */}
        <motion.div style={{ x, opacity, scale }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {APPLICATION_STAGES.map((stage, index) => (
            <div
              key={stage.id}
              className="relative rounded-3xl overflow-hidden border border-blue-500/30 backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-blue-950/20 to-purple-950/20 p-6 hover:scale-105 transition-transform"
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4">{stage.icon}</div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">{stage.title}</h3>
                <p className={`text-xs font-semibold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                  {stage.phase}
                </p>
                <p className="text-base font-semibold text-white/90">{stage.tagline}</p>
                <p className="text-white/70 text-sm leading-relaxed">{stage.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <button
            data-tally-open="J9KGO4"
            data-tally-layout="modal"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-lg hover:scale-105 transition-transform shadow-2xl shadow-purple-500/50"
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};
