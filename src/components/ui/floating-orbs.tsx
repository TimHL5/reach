import { motion } from 'framer-motion';
import { useState } from 'react';

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
}

export const FloatingOrbs = () => {
  const [orbs] = useState<Orb[]>([
    {
      id: 1,
      size: 400,
      x: 10,
      y: 10,
      color: 'from-blue-500/20 to-purple-500/20',
      duration: 20,
    },
    {
      id: 2,
      size: 300,
      x: 70,
      y: 20,
      color: 'from-purple-500/20 to-pink-500/20',
      duration: 25,
    },
    {
      id: 3,
      size: 350,
      x: 20,
      y: 60,
      color: 'from-pink-500/20 to-blue-500/20',
      duration: 22,
    },
    {
      id: 4,
      size: 250,
      x: 80,
      y: 70,
      color: 'from-blue-400/20 to-purple-400/20',
      duration: 18,
    },
  ]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, 0, 50, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
