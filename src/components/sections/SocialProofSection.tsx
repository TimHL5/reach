import { motion } from 'framer-motion';
import { GlowingEffect } from '../ui/glowing-effect';

export const SocialProofSection = () => {
  const founders = [
    {
      name: 'Tim Liu',
      role: 'Co-Founder',
      image: '/tim.png',
      initials: 'TL',
    },
    {
      name: 'Ethan Foreman',
      role: 'Co-Founder',
      image: '/ethan.png',
      initials: 'EF',
    },
    {
      name: 'Alex Amaral',
      role: 'Co-Founder',
      image: '/alex.png',
      initials: 'AA',
    },
  ];

  const stats = [
    { number: '500+', label: 'Students on waitlist' },
    { number: '3.9+', label: 'Average founder GPA' },
    { number: 'Spring 2026', label: 'Launch date' },
  ];

  return (
    <section id="social-proof" className="section-spacing bg-black">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Built by Students,
            <br />
            <span className="text-gradient-primary">For Students</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative glass-card p-12 md:p-16">
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={100}
              borderWidth={2}
            />

            <div className="relative z-10">
              {/* Founder photos */}
              <div className="flex justify-center gap-6 md:gap-8 mb-12">
                {founders.map((founder, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, ease: [0.33, 1, 0.68, 1] }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/20 mb-4 mx-auto bg-gradient-to-br from-reach-blue to-reach-purple flex items-center justify-center text-white text-2xl font-bold">
                      {founder.image ? (
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = founder.initials;
                            }
                          }}
                        />
                      ) : (
                        founder.initials
                      )}
                    </div>
                    <p className="text-sm font-medium text-white/90">{founder.name}</p>
                    <p className="text-xs text-white/50">{founder.role}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-center text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
                "We went through the admissions process recently and saw the inequality firsthand. Wealthy families get consultants. Everyone else struggles alone.
                <br /><br />
                <span className="text-gradient-primary font-semibold">
                  We're fixing that.
                </span>"
              </blockquote>

              <p className="text-center text-white/60">
                <span className="font-medium">Tim Liu, Ethan Foreman & Alex Amaral</span>
                <br />
                Boston College '26
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient-primary mb-3">
                {stat.number}
              </div>
              <div className="text-base md:text-lg text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
