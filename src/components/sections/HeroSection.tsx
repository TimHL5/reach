import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AuroraBackground } from '../ui/aurora-background';
import { WaitlistButton } from '../ui/waitlist-button';
import { FloatingOrbs } from '../ui/floating-orbs';
import { useCurrentTime, getTimeBasedMessage } from '../../hooks/useCurrentTime';

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Time-based personalization
  const currentTime = useCurrentTime();

  // Default message for SSR/initial render
  const defaultMessage = {
    time: '6pm',
    message: "staring at your Common App essay at 2am, wondering if it's good enough?",
  };

  // Get personalized message based on time
  const { message } = currentTime ? getTimeBasedMessage(currentTime) : defaultMessage;

  const headline = `are YOU ${message}`;
  const words = headline.split(' ');

  return (
    <section ref={ref} className="relative w-full min-h-screen">
      <AuroraBackground className="absolute inset-0">
        {/* 3D Floating Orbs Background */}
        <FloatingOrbs />

        {/* Animated gradient orbs with parallax */}
        <motion.div
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </AuroraBackground>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-12">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.08,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className={`inline-block mr-[0.35em] ${
                    word === 'YOU'
                      ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extrabold'
                      : 'text-white/90'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl font-medium"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + words.length * 0.08 + 0.3,
                ease: [0.33, 1, 0.68, 1],
              }}
              style={{
                color: 'rgba(250, 251, 252, 0.80)',
              }}
            >
              We got you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + words.length * 0.08 + 0.6,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="flex justify-center w-full"
            >
              <WaitlistButton size="xxl">
                Join 500+ Students on the Waitlist
              </WaitlistButton>
            </motion.div>

            {/* Enhanced scroll indicator */}
            <motion.button
              onClick={() => {
                document.getElementById('journey')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              whileHover={{ y: 5 }}
              className="mt-8 md:mt-12
                         flex flex-col items-center justify-center gap-3
                         text-white/90 hover:text-white
                         font-semibold
                         transition-all duration-300
                         cursor-pointer
                         px-4"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              <span className="text-sm md:text-base tracking-wide">
                See how it works
              </span>
              <motion.svg
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
