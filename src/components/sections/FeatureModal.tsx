import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface UseCase {
  title: string;
  description: string;
}

interface Feature {
  id: string;
  title: string;
  phase: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  detailedDescription: string;
  benefits: string[];
  useCases: UseCase[];
  mockupImage: string;
  mockupAlt: string;
  features: string[];
}

interface FeatureModalProps {
  feature: Feature | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const FeatureModal = ({
  feature,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: FeatureModalProps) => {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!feature) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl
                         bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
                         backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full
                         bg-white/10 hover:bg-white/20 backdrop-blur-sm
                         flex items-center justify-center transition-colors
                         text-white/70 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation arrows */}
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-10
                           w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
                           backdrop-blur-sm flex items-center justify-center
                           transition-colors text-white/70 hover:text-white"
                  aria-label="Previous feature"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {hasNext && (
                <button
                  onClick={onNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-10
                           w-12 h-12 rounded-full bg-white/10 hover:bg-white/20
                           backdrop-blur-sm flex items-center justify-center
                           transition-colors text-white/70 hover:text-white"
                  aria-label="Next feature"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Content */}
              <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="text-6xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h2 className="text-4xl font-bold text-white">{feature.title}</h2>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold
                                       bg-gradient-to-r from-blue-500/20 to-purple-500/20
                                       text-blue-300 border border-blue-500/30"
                        >
                          {feature.phase}
                        </span>
                      </div>
                      <p className="text-xl text-white/70 mb-4">{feature.tagline}</p>
                      <p className="text-white/60 leading-relaxed">{feature.detailedDescription}</p>
                    </div>
                  </div>

                  {/* Mockup Image */}
                  <div
                    className="relative w-full h-[400px] md:h-[500px] mb-8
                                rounded-2xl overflow-hidden border border-white/10
                                bg-gradient-to-br from-slate-800 to-slate-900"
                  >
                    {/* Placeholder for mockup */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{feature.icon}</div>
                        <p className="text-white/40 text-sm">Product mockup coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Key Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {feature.benefits.map((benefit: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-4 rounded-xl
                                   bg-white/5 border border-white/10"
                        >
                          <div
                            className="w-6 h-6 rounded-full bg-gradient-to-r
                                        from-blue-500 to-purple-500 flex items-center
                                        justify-center flex-shrink-0 mt-0.5"
                          >
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">How Students Use It</h3>
                    <div className="space-y-4">
                      {feature.useCases.map((useCase: UseCase, index: number) => (
                        <div
                          key={index}
                          className="p-6 rounded-xl bg-gradient-to-br
                                   from-blue-500/10 to-purple-500/10
                                   border border-blue-500/20"
                        >
                          <h4 className="text-lg font-semibold text-white mb-2">{useCase.title}</h4>
                          <p className="text-white/70">{useCase.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {feature.features.map((feat: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-white/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 border-t border-white/10">
                    <button
                      data-tally-open="J9KGO4"
                      data-tally-layout="modal"
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500
                               rounded-full text-white font-semibold text-lg
                               hover:scale-105 transition-transform shadow-2xl
                               shadow-purple-500/50"
                    >
                      Join Waitlist
                    </button>
                    <button
                      onClick={onClose}
                      className="px-8 py-4 bg-white/10 hover:bg-white/20
                               rounded-full text-white font-semibold text-lg
                               transition-colors"
                    >
                      Back to Features
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
