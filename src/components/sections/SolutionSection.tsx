import { motion } from 'framer-motion';
import { Target, FileEdit, RefreshCw, Send, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';

export const SolutionSection = () => {
  const stages = [
    {
      icon: Target,
      title: 'Track',
      subtitle: 'Freshman-Junior Year',
      description: 'Document your journey from day one',
      details:
        'Track extracurriculars, leadership roles, awards, and projects. Build a comprehensive portfolio that tells your complete story.',
    },
    {
      icon: FileEdit,
      title: 'Draft',
      subtitle: 'Summer before Senior Year',
      description: 'Write essays with intelligent feedback',
      details:
        'Get instant, specific feedback on Common App essays. Our AI identifies weak spots and suggests improvements while preserving your authentic voice.',
    },
    {
      icon: RefreshCw,
      title: 'Refine',
      subtitle: 'Fall Senior Year',
      description: 'Iterate until it is perfect',
      details:
        'Compare drafts, track improvements, and see your writing evolve. Know when your essay is truly ready to submit.',
    },
    {
      icon: Send,
      title: 'Apply',
      subtitle: 'Winter Senior Year',
      description: 'One-click sync to Common App',
      details:
        'Stop copying and pasting. Sync your Reach profile directly to Common App and apply to schools in minutes, not hours.',
    },
    {
      icon: DollarSign,
      title: 'Fund',
      subtitle: 'Acceptance → Enrollment',
      description: 'Find money you are leaving on the table',
      details:
        'Auto-match with scholarships and financial aid based on your profile. Our students find thousands in aid they did not know existed.',
    },
  ];

  return (
    <section id="solution" className="py-20 bg-cloud">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight mb-6">
            Everything you need to reach your dream schools.
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            From freshman year to acceptance, Reach is the workspace where you build your
            application with AI guidance at every step.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-brand -translate-x-1/2" />

          {/* Stage cards */}
          <div className="space-y-12">
            {stages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`lg:grid lg:grid-cols-2 gap-8 items-center ${
                  idx % 2 === 0 ? '' : 'lg:grid-flow-dense'
                }`}
              >
                <div className={idx % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}>
                  <Card className="inline-block max-w-lg">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center">
                        <stage.icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-2xl font-bold text-midnight mb-1">{stage.title}</h3>
                        <p className="text-sm text-reach-purple font-medium mb-3">
                          {stage.subtitle}
                        </p>
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                          {stage.description}
                        </p>
                        <p className="text-gray-600">{stage.details}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="w-6 h-6 bg-white border-4 border-reach-blue rounded-full shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
