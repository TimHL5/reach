import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { Card } from '../ui/Card';
import { TallyButton } from '../ui/TallyButton';

export const SocialProofSection = () => {
  const founders = [
    {
      name: 'Tim Liu',
      role: 'CEO',
      credentials: "BC '26, Finance & Entrepreneurship",
      quote:
        'I bootstrapped my way through admissions and built a $50K edtech company. Every student deserves the tools I wish I had.',
      linkedin: 'https://www.linkedin.com/in/timothyhaiyiliu/',
      email: 'tim@reachadmissions.app',
      image: '/timothy.jpeg',
      initials: 'TL',
    },
    {
      name: 'Ethan Foreman',
      role: 'CMO',
      credentials: "BC '26, Marketing",
      quote:
        'I navigated admissions as a first-gen student. Reach exists to level the playing field for everyone who does not have access to expensive consultants.',
      linkedin: 'https://www.linkedin.com/in/ethan-j-foreman/',
      email: 'ethan@reachadmissions.app',
      image: '/ethan.jpeg',
      initials: 'EF',
    },
    {
      name: 'Alex Amaral',
      role: 'CFO',
      credentials: "BC '26, Finance",
      quote:
        'Financial barriers should not determine educational outcomes. We are making world-class guidance accessible to every family.',
      linkedin: 'https://www.linkedin.com/in/alexander-amaral-8a1743288/',
      email: 'alex@reachadmissions.app',
      image: '/alex.jpeg',
      initials: 'AA',
    },
    {
      name: 'Dean Kaduboski',
      role: 'COO',
      credentials: "BC '26, Finance & Leadership",
      quote:
        'Every student deserves a fair shot at their dream schools. We are building the tools to make that possible.',
      linkedin: 'https://www.linkedin.com/in/deankaduboski/',
      email: 'dean@reachadmissions.app',
      image: '/dean.jpeg',
      initials: 'DK',
    },
  ];

  return (
    <section id="social-proof" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-midnight mb-6">
            Founded by students who get it
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We've been through the admissions process recently. We know what works and what
            doesn't. And we're building the tools we wish existed when we were applying.
          </p>
        </motion.div>

        {/* Founder cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-brand rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                  {founder.image ? (
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        if (e.currentTarget.nextSibling) {
                          (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <span className={founder.image ? 'hidden' : ''}>
                    {founder.initials || founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-midnight mb-1">{founder.name}</h3>
                <p className="text-reach-blue font-semibold mb-1">{founder.role}</p>
                <p className="text-sm text-gray-600 mb-4">{founder.credentials}</p>
                <p className="text-gray-700 italic mb-4 flex-1">"{founder.quote}"</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-reach-blue hover:text-reach-purple transition-colors"
                    aria-label={`${founder.name} LinkedIn profile`}
                  >
                    <Linkedin size={18} className="mr-1" />
                    Connect
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="inline-flex items-center text-reach-blue hover:text-reach-purple transition-colors"
                    aria-label={`Email ${founder.name}`}
                  >
                    <Mail size={18} className="mr-1" />
                    Email
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Beta interest counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-brand text-white rounded-2xl p-12 text-center max-w-2xl mx-auto"
        >
          <div className="text-6xl font-bold mb-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              200+
            </motion.span>
          </div>
          <p className="text-2xl font-semibold mb-2">
            Students already on the waitlist
          </p>
          <p className="text-white/90 mb-6">
            for Spring 2026 launch
          </p>
          <TallyButton variant="secondary">
            Join the Waitlist
          </TallyButton>
          <noscript>
            <a
              href="https://tally.so/r/J9KGO4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-reach-blue px-8 py-4 rounded-lg font-semibold text-lg mt-4"
            >
              Join the Waitlist
            </a>
          </noscript>
        </motion.div>
      </div>
    </section>
  );
};
