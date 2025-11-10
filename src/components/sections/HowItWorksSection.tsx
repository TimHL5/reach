import { motion } from 'framer-motion';
import { Edit3, Sparkles, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

export const HowItWorksSection = () => {
  const [demoText, setDemoText] = useState('Growing up, I always loved science...');
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      icon: Edit3,
      title: 'You Write',
      description: 'Start with your story in your own words',
      details:
        'We do not write for you. You write your authentic first draft, expressing your experiences and personality.',
    },
    {
      icon: Sparkles,
      title: 'AI Analyzes',
      description: 'Our AI identifies what is working and what is not',
      details: 'Specific, actionable feedback on vague language, weak verbs, structure issues, voice inconsistencies, and missing context.',
      highlights: [
        'Vague language → suggestions for specificity',
        'Weak verbs → stronger alternatives',
        'Structure issues → reorganization ideas',
        'Voice inconsistencies → tone adjustments',
        'Missing context → questions to answer',
      ],
    },
    {
      icon: CheckCircle,
      title: 'You Improve',
      description: 'Revise with confidence, staying true to yourself',
      details:
        'You make the final decisions. The AI guides, you choose. Your voice stays intact, just clearer and more compelling.',
    },
  ];

  const handleGetFeedback = () => {
    setShowFeedback(true);
  };

  return (
    <section id="how-it-works" className="py-20 bg-cloud">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight mb-6">
            Behind the scenes
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transparency builds trust. Here's exactly how Reach helps you write better essays.
          </p>
        </motion.div>

        {/* Three steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-brand rounded-xl mb-4">
                <step.icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-midnight mb-3">{step.title}</h3>
              <p className="text-lg font-semibold text-reach-blue mb-3">{step.description}</p>
              <p className="text-gray-600 mb-4">{step.details}</p>
              {step.highlights && (
                <ul className="space-y-2">
                  {step.highlights.map((item, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      • {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Interactive demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-midnight mb-6 text-center">
            Try it yourself:
          </h3>

          <textarea
            value={demoText}
            onChange={(e) => setDemoText(e.target.value)}
            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-reach-blue focus:outline-none text-midnight mb-4"
            placeholder="Write a sample essay paragraph..."
          />

          {!showFeedback ? (
            <Button onClick={handleGetFeedback} className="w-full">
              Get AI Feedback
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-warning/10 border-l-4 border-warning p-6 rounded-lg"
            >
              <div className="flex items-start space-x-3">
                <Sparkles className="text-warning flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold text-midnight mb-2">AI Feedback:</p>
                  <p className="text-gray-700 mb-3">
                    Make "loved science" more specific. What kind of science? What did you actually
                    do? Show, don't tell. Consider adding a specific moment or experience that
                    demonstrates your passion.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Suggested revision:</strong> "From dissecting frogs in 8th grade
                    biology to building my first Arduino circuit at 15, hands-on scientific
                    exploration has been my constant curiosity driver."
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {showFeedback && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                setDemoText('');
                setShowFeedback(false);
              }}
              className="mt-4 text-reach-blue hover:text-reach-purple transition-colors text-sm font-medium"
            >
              Try another example →
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
