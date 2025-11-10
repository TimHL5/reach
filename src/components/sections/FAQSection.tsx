import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is this cheating?',
      answer:
        "No. Reach helps you write better, it doesn't write for you. Think of it like having a writing tutor available 24/7—completely legitimate and encouraged by colleges. The essay remains yours; we just help you articulate your thoughts more clearly.",
    },
    {
      question: 'How is this different from ChatGPT?',
      answer:
        "ChatGPT is a general-purpose tool. Reach is specifically trained for college admissions and understands what makes strong applications. Plus, we preserve your voice—our goal is to sound more like YOU, not like an AI.",
    },
    {
      question: 'Will this work for my situation?',
      answer:
        "Yes. Whether you're aiming for Ivies or state schools, international or domestic, first-gen or legacy, our tools help you tell YOUR story more effectively. The principles of good writing are universal.",
    },
    {
      question: "What if I'm not a strong writer?",
      answer:
        "That's exactly who we built this for. Our AI breaks down complex writing concepts into simple, actionable steps. Many of our beta users started as nervous writers and ended up confident in their essays.",
    },
    {
      question: 'When do I get access?',
      answer:
        "We're launching Spring 2026. Waitlist members get: Early access to beta (limited spots), Lifetime 50% discount ($99/year), Input on product development, and Priority support during launch.",
    },
    {
      question: "What if I sign up and don't like it?",
      answer:
        "We'll have a 30-day money-back guarantee at launch. Try it risk-free. (Note: Beta users get it free during beta period.)",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight mb-6">
            Questions? We've got answers.
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Real talk about how Reach works and why it's different.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-cloud rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-semibold text-midnight pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={24} className="text-reach-blue flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed">
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
