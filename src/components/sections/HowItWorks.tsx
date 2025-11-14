import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FeatureModal } from './FeatureModal';

const APPLICATION_STAGES = [
  {
    id: 'track',
    title: 'Track',
    phase: 'Freshman-Junior Year',
    tagline: 'Document your journey from day one',
    description:
      'Track extracurriculars, leadership roles, awards, and projects. Build a comprehensive portfolio that tells your complete story.',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    detailedDescription:
      "Stop scrambling senior year to remember what you did freshman year. Track logs every activity, award, and achievement as they happen, building a comprehensive timeline of your high school journey.",
    benefits: [
      'Never forget an achievement or activity',
      'Build your Activities List as you go',
      'See gaps in your profile early',
      'Auto-generate activity descriptions',
      'Track hours and impact metrics',
    ],
    useCases: [
      {
        title: 'Log Leadership Roles',
        description:
          'Record your position as Debate Team Captain, track weekly practice hours, and document tournament wins in real-time.',
      },
      {
        title: 'Chronicle Projects',
        description:
          'From coding apps to community service initiatives, capture the full story of what you built and its impact.',
      },
    ],
    mockupImage: '/mockups/track-dashboard.png',
    mockupAlt: 'Track dashboard showing student activities timeline with filters and categories',
    features: [
      'Activity timeline with categories',
      'Hour tracking and verification',
      'Impact metrics and outcomes',
      'Photo and document uploads',
      'Export to Common App format',
    ],
  },
  {
    id: 'draft',
    title: 'Draft',
    phase: 'Summer before Senior Year',
    tagline: 'Write essays with intelligent feedback',
    description:
      'Get instant, specific feedback on Common App essays. Our AI identifies weak spots and suggests improvements while preserving your authentic voice.',
    icon: '✍️',
    color: 'from-purple-500 to-pink-500',
    detailedDescription:
      "Our AI essay coach gives you line-by-line feedback on your Common App essay, identifying clichés, weak storytelling, and missed opportunities—while keeping your unique voice intact.",
    benefits: [
      'Real-time feedback as you write',
      'Identify overused phrases and clichés',
      'Strengthen narrative structure',
      'Maintain your authentic voice',
      'Compare against successful essays',
    ],
    useCases: [
      {
        title: 'Beat Writer\'s Block',
        description:
          'AI suggests prompts and angles based on your tracked activities, helping you find the story only you can tell.',
      },
      {
        title: 'Spot Weak Arguments',
        description:
          'Get flagged when you\'re telling instead of showing, or when your conclusion doesn\'t match your story.',
      },
    ],
    mockupImage: '/mockups/draft-editor.png',
    mockupAlt: 'Essay editor with AI feedback sidebar highlighting suggestions',
    features: [
      'Smart essay editor with AI',
      'Cliché and weakness detection',
      'Voice preservation analysis',
      'Story arc visualization',
      'Prompt brainstorming tools',
    ],
  },
  {
    id: 'refine',
    title: 'Refine',
    phase: 'Fall Senior Year',
    tagline: 'Iterate until it is perfect',
    description:
      'Compare drafts, track improvements, and see your writing evolve. Know when your essay is truly ready to submit.',
    icon: '✨',
    color: 'from-indigo-500 to-purple-500',
    detailedDescription:
      "Track every version of your essay with version control. See exactly what changed, what improved, and when your essay crossed from 'good' to 'great.'",
    benefits: [
      'Version control for all drafts',
      'Side-by-side draft comparison',
      'Quality score over time',
      'Peer and mentor feedback',
      'Know when to stop editing',
    ],
    useCases: [
      {
        title: 'Compare Versions',
        description: 'See Draft 1 next to Draft 5. Did your edits actually improve the essay? Our metrics tell you.',
      },
      {
        title: 'Collaborate Safely',
        description:
          'Share drafts with teachers or mentors without losing control. Accept or reject suggestions with one click.',
      },
    ],
    mockupImage: '/mockups/refine-comparison.png',
    mockupAlt: 'Split-screen showing two essay versions with change highlights',
    features: [
      'Unlimited version history',
      'Visual diff comparison',
      'Quality improvement metrics',
      'Collaborative feedback tools',
      'Readiness score algorithm',
    ],
  },
  {
    id: 'apply',
    title: 'Apply',
    phase: 'Winter Senior Year',
    tagline: 'One-click sync to Common App',
    description:
      'Stop copying and pasting. Sync your Reach profile directly to Common App and apply to schools in minutes, not hours.',
    icon: '🚀',
    color: 'from-blue-500 to-indigo-500',
    detailedDescription:
      "Four years of work shouldn't take weeks to submit. Our one-click sync pushes your entire Reach profile—activities, essays, everything—directly to Common App.",
    benefits: [
      'Instant Common App integration',
      'Auto-fill activities list',
      'Essay formatting preserved',
      'Apply to multiple schools fast',
      'No copy-paste errors',
    ],
    useCases: [
      {
        title: 'Apply to 20 Schools in Minutes',
        description: 'Your profile is built. Click sync, select schools, customize supplements. Submit. That\'s it.',
      },
      {
        title: 'Avoid Formatting Nightmares',
        description:
          'No more losing formatting when copying essays. No more character count surprises. It just works.',
      },
    ],
    mockupImage: '/mockups/apply-sync.png',
    mockupAlt: 'Application dashboard showing one-click sync to Common App',
    features: [
      'Direct Common App API integration',
      'Activity list auto-population',
      'Essay formatting preservation',
      'School list management',
      'Deadline tracking system',
    ],
  },
  {
    id: 'fund',
    title: 'Fund',
    phase: 'Acceptance → Enrollment',
    tagline: 'Find money you are leaving on the table',
    description:
      'Auto-match with scholarships and financial aid based on your profile. Our students find thousands in aid they didn\'t know existed.',
    icon: '💰',
    color: 'from-green-500 to-emerald-500',
    detailedDescription:
      "Most students leave thousands on the table. Fund scans 50,000+ scholarships and matches you with ones you actually qualify for—based on your exact profile.",
    benefits: [
      '50,000+ scholarship database',
      'AI-powered matching algorithm',
      'Auto-fill scholarship applications',
      'Deadline reminders',
      'Track submitted applications',
    ],
    useCases: [
      {
        title: 'Find Hidden Scholarships',
        description:
          'A $5,000 scholarship for debate students in Massachusetts who\'ve coded apps? Fund finds it and tells you you\'re qualified.',
      },
      {
        title: 'Apply in Bulk',
        description: 'Many scholarships ask the same questions. Answer once, apply to 10. Fund handles the repetition.',
      },
    ],
    mockupImage: '/mockups/fund-matches.png',
    mockupAlt: 'Scholarship matching dashboard showing personalized recommendations',
    features: [
      'AI scholarship matching',
      'Application auto-fill',
      'Deadline calendar',
      'Essay reuse suggestions',
      'Award tracking dashboard',
    ],
  },
];

export const HowItWorks = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [200, 0, 0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  // Modal state
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedFeature(index);
  };

  const closeModal = () => {
    setSelectedFeature(null);
  };

  const goToPrevious = () => {
    if (selectedFeature !== null && selectedFeature > 0) {
      setSelectedFeature(selectedFeature - 1);
    }
  };

  const goToNext = () => {
    if (selectedFeature !== null && selectedFeature < APPLICATION_STAGES.length - 1) {
      setSelectedFeature(selectedFeature + 1);
    }
  };

  return (
    <section ref={containerRef} id="how-it-works" className="relative py-32 min-h-screen flex items-center overflow-hidden">
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
            From freshman year to acceptance, Reach is the workspace where you build your application with AI guidance at
            every step.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-white/50 text-sm"
          >
            <span>Click any card to learn more</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </motion.div>
        </div>

        {/* Cards Container */}
        <motion.div style={{ x, opacity, scale }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {APPLICATION_STAGES.map((stage, index) => (
            <motion.button
              key={stage.id}
              onClick={() => openModal(index)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-3xl overflow-hidden border border-blue-500/30
                       backdrop-blur-xl bg-gradient-to-br from-slate-900/80
                       via-blue-950/20 to-purple-950/20 p-6
                       transition-all cursor-pointer
                       hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20
                       group text-left"
            >
              {/* Click hint */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/0
                            to-purple-500/0 group-hover:from-blue-500/10
                            group-hover:to-purple-500/10 transition-all"
              />

              {/* Number Badge */}
              <div
                className="absolute top-4 right-4 w-10 h-10 rounded-full
                            bg-gradient-to-br from-blue-500 to-purple-500
                            flex items-center justify-center text-white font-bold
                            text-sm shadow-lg"
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{stage.icon}</div>

              {/* Content */}
              <div className="space-y-3 relative z-10">
                <h3 className="text-2xl font-bold text-white">{stage.title}</h3>
                <p className={`text-xs font-semibold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                  {stage.phase}
                </p>
                <p className="text-base font-semibold text-white/90">{stage.tagline}</p>
                <p className="text-white/70 text-sm leading-relaxed">{stage.description}</p>

                {/* Click indicator */}
                <div
                  className="flex items-center gap-2 text-blue-400 text-sm
                              opacity-0 group-hover:opacity-100 transition-opacity pt-2"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.button>
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
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500
                     rounded-full text-white font-semibold text-lg
                     hover:scale-105 transition-transform shadow-2xl
                     shadow-purple-500/50"
          >
            Start Your Journey
          </button>
        </motion.div>
      </div>

      {/* Feature Modal */}
      <FeatureModal
        feature={selectedFeature !== null ? APPLICATION_STAGES[selectedFeature] : null}
        isOpen={selectedFeature !== null}
        onClose={closeModal}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={selectedFeature !== null && selectedFeature > 0}
        hasNext={selectedFeature !== null && selectedFeature < APPLICATION_STAGES.length - 1}
      />
    </section>
  );
};
