import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Will this write my essays for me?',
      answer:
        'No. Reach helps you write better, not writes for you. Our AI analyzes your drafts and provides specific, actionable feedback to improve clarity, structure, and impact—while keeping your authentic voice intact. Admissions officers can spot AI-written essays. We help you tell YOUR story, just better.',
    },
    {
      question: 'How is this different from ChatGPT?',
      answer:
        "ChatGPT is a general tool. Reach is purpose-built for college admissions with specialized knowledge of what works in applications. We understand essay structures, activity descriptions, and the nuances of different colleges. Plus, we provide a complete workspace—not just a chat interface.",
    },
    {
      question: 'Is $199/year really worth it compared to free tools?',
      answer:
        "Consider this: consultants charge $5,000-$20,000 for limited hours. Reach gives you unlimited access to AI guidance 24/7 for the cost of a few textbooks. If it helps you get into one better school or find one scholarship, it's paid for itself 10x over.",
    },
    {
      question: 'When can I start using Reach?',
      answer:
        "We're launching Spring 2026 with early access for waitlist members. Join now to get 50% off ($99/year lifetime) and help shape the product during beta.",
    },
    {
      question: "What if I don't like it?",
      answer:
        "30-day money-back guarantee, no questions asked. We're confident you'll love it, but if not, you get a full refund.",
    },
  ];

  return (
    <section id="faq" className="section-spacing bg-midnight">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Questions?
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.05, ease: [0.33, 1, 0.68, 1] }}
              className="border border-white/10 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm hover:border-white/20 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left gap-4"
              >
                <span className="text-base md:text-lg font-medium text-white/90 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                  <ChevronDown size={20} className="text-white/60 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-5 md:pb-6 text-white/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
