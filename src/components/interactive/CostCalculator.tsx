import { useState } from 'react';
import { motion } from 'framer-motion';

export const CostCalculator = () => {
  const [hours, setHours] = useState(20);
  const hourlyRate = 250;
  const totalCost = hours * hourlyRate;

  const comparisons = [
    { icon: '🌯', label: 'Chipotle burritos', value: Math.floor(totalCost / 6) },
    { icon: '🎵', label: 'months of Spotify', value: Math.floor(totalCost / 10.99) },
    { icon: '⏰', label: 'hours of minimum wage work', value: Math.floor(totalCost / 7.25) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-cloud rounded-xl p-8 max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-midnight mb-6">
        What college consultants actually cost:
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="hours" className="font-medium text-midnight">
              Number of hours:
            </label>
            <span className="text-2xl font-bold text-reach-blue">{hours} hours</span>
          </div>
          <input
            id="hours"
            type="range"
            min="10"
            max="100"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-reach-blue"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="text-center">
            <div className="text-gray-600 mb-2">
              {hours} hours × ${hourlyRate}/hour =
            </div>
            <motion.div
              key={totalCost}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold text-reach-blue mb-4"
            >
              ${totalCost.toLocaleString()}
            </motion.div>

            <div className="space-y-2 text-left">
              <p className="text-sm text-gray-600 mb-2">That's the same as:</p>
              {comparisons.map((comp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-2xl">{comp.icon}</span>
                  <span className="text-gray-700">
                    <strong>{comp.value.toLocaleString()}</strong> {comp.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-brand rounded-lg p-6 text-white text-center">
          <div className="text-lg mb-2">Reach cost:</div>
          <div className="text-4xl font-bold">$199/year ✨</div>
          <div className="text-sm mt-2 opacity-90">
            That's {Math.round((199 / totalCost) * 100)}% of the consultant cost
          </div>
        </div>
      </div>
    </motion.div>
  );
};
