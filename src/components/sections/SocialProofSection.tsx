import { motion } from 'framer-motion';

export const SocialProofSection = () => {
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
