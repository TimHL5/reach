import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const EssayDemo = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [isImproved, setIsImproved] = useState(false);
  const [typedText, setTypedText] = useState('');

  const originalText = 'Growing up, I always wanted to';
  const improvedText = 'Growing up in a small rural town where opportunities were scarce, I discovered my passion for';

  useEffect(() => {
    if (typedText.length < originalText.length) {
      const timeout = setTimeout(() => {
        setTypedText(originalText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!showFeedback) {
      const timeout = setTimeout(() => {
        setShowFeedback(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, showFeedback]);

  const handleImprove = () => {
    setIsImproved(true);
    setShowFeedback(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      className="bg-white rounded-lg shadow-2xl p-6 max-w-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-midnight">Essay Draft v{isImproved ? '2' : '1'}</h3>
        <div className="text-sm text-gray-500">
          {isImproved ? improvedText.split(' ').length : typedText.split(' ').length} words
        </div>
      </div>

      <div className="border-t border-b border-gray-200 py-4 mb-4 min-h-[120px]">
        <p className="text-midnight leading-relaxed">
          {isImproved ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-success"
            >
              {improvedText}
            </motion.span>
          ) : (
            <>
              {typedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-reach-blue ml-1 align-middle"
              />
            </>
          )}
        </p>
      </div>

      <AnimatePresence>
        {showFeedback && !isImproved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-warning/10 border-l-4 border-warning p-4 rounded"
          >
            <p className="text-sm text-midnight mb-3">
              <strong>AI Feedback:</strong> Make this more specific. What exactly did you want? Add
              context about your background to create a stronger opening.
            </p>
            <button
              onClick={handleImprove}
              className="text-sm font-semibold text-reach-blue hover:text-reach-purple transition-colors"
            >
              See it improved →
            </button>
          </motion.div>
        )}

        {isImproved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-success/10 border-l-4 border-success p-4 rounded"
          >
            <p className="text-sm text-midnight">
              <strong>Much better!</strong> This version is more specific, provides context, and
              hooks the reader's attention.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
