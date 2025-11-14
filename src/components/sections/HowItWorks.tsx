import { ContainerScroll, ContainerSticky, ProcessCard, ProcessCardBody, ProcessCardTitle } from '../ui/process-timeline';
import { Target, FileEdit, RefreshCw, Send, DollarSign } from 'lucide-react';
import { WaitlistButton } from '../ui/waitlist-button';

const APPLICATION_STAGES = [
  {
    id: 'track',
    title: 'Track',
    phase: 'Freshman-Junior Year',
    tagline: 'Document your journey from day one',
    description: 'Track extracurriculars, leadership roles, awards, and projects. Build a comprehensive portfolio that tells your complete story.',
    Icon: Target,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'draft',
    title: 'Draft',
    phase: 'Summer before Senior Year',
    tagline: 'Write essays with intelligent feedback',
    description: 'Get instant, specific feedback on Common App essays. Our AI identifies weak spots and suggests improvements while preserving your authentic voice.',
    Icon: FileEdit,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'refine',
    title: 'Refine',
    phase: 'Fall Senior Year',
    tagline: 'Iterate until it is perfect',
    description: 'Compare drafts, track improvements, and see your writing evolve. Know when your essay is truly ready to submit.',
    Icon: RefreshCw,
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'apply',
    title: 'Apply',
    phase: 'Winter Senior Year',
    tagline: 'One-click sync to Common App',
    description: 'Stop copying and pasting. Sync your Reach profile directly to Common App and apply to schools in minutes, not hours.',
    Icon: Send,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'fund',
    title: 'Fund',
    phase: 'Acceptance → Enrollment',
    tagline: 'Find money you are leaving on the table',
    description: 'Auto-match with scholarships and financial aid based on your profile. Our students find thousands in aid they didn\'t know existed.',
    Icon: DollarSign,
    color: 'from-green-500 to-emerald-500',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Everything you need to reach
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              your dream schools.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            From freshman year to acceptance, Reach is the workspace where you build
            your application with AI guidance at every step.
          </p>

          {/* Desktop only instruction */}
          <div className="hidden md:flex items-center justify-center gap-2 text-white/50 text-sm">
            <span>Scroll to explore the journey</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Desktop: Horizontal Scroll Timeline */}
        <div className="hidden md:block">
          <ContainerScroll className="h-[200vh] pb-32">
            <ContainerSticky className="top-24 flex flex-nowrap gap-8 px-8">
              {APPLICATION_STAGES.map((stage, index) => (
                <div key={stage.id} className="flex items-center gap-4">
                  <ProcessCard
                    itemsLength={APPLICATION_STAGES.length}
                    index={index}
                    className="min-w-[450px] max-w-[450px] rounded-3xl overflow-hidden"
                    variant="indigo"
                  >
                    {/* Card Number Badge */}
                    <ProcessCardTitle className="border-r border-blue-500/30 flex items-start p-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        {/* Vertical progress line */}
                        {index < APPLICATION_STAGES.length - 1 && (
                          <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-500/50 to-transparent min-h-[200px]" />
                        )}
                      </div>
                    </ProcessCardTitle>

                    {/* Card Content */}
                    <ProcessCardBody className="gap-6 p-8">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <stage.Icon className="w-7 h-7 text-blue-400" />
                      </div>

                      {/* Title & Phase */}
                      <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-white">
                          {stage.title}
                        </h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                          {stage.phase}
                        </p>
                      </div>

                      {/* Tagline */}
                      <p className="text-xl font-semibold text-white/90">
                        {stage.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-white/70 leading-relaxed">
                        {stage.description}
                      </p>
                    </ProcessCardBody>
                  </ProcessCard>

                  {/* Progress dots between cards */}
                  {index < APPLICATION_STAGES.length - 1 && (
                    <div className="flex items-center justify-center w-16">
                      <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </ContainerSticky>
          </ContainerScroll>
        </div>

        {/* Mobile: Vertical Card Layout */}
        <div className="md:hidden space-y-6 max-w-xl mx-auto">
          {APPLICATION_STAGES.map((stage, index) => (
            <div
              key={stage.id}
              className="relative rounded-3xl overflow-hidden border border-blue-500/30 backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-blue-950/20 to-purple-950/20 p-6"
            >
              {/* Number Badge */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                <stage.Icon className="w-6 h-6 text-blue-400" />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">
                  {stage.title}
                </h3>
                <p className={`text-xs font-semibold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                  {stage.phase}
                </p>
                <p className="text-lg font-semibold text-white/90">
                  {stage.tagline}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="mt-16 md:mt-24 text-center">
          <WaitlistButton size="xl" className="shadow-2xl shadow-purple-500/50">
            Start Your Journey
          </WaitlistButton>
        </div>
      </div>
    </section>
  );
};
