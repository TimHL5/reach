import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 100);
    });
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${isScrolled ? 'text-reach-blue' : 'text-white'}`}>
            reach.
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className={`font-medium hover:text-reach-blue transition-colors ${
              isScrolled ? 'text-midnight' : 'text-white'
            }`}
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className={`font-medium hover:text-reach-blue transition-colors ${
              isScrolled ? 'text-midnight' : 'text-white'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className={`font-medium hover:text-reach-blue transition-colors ${
              isScrolled ? 'text-midnight' : 'text-white'
            }`}
          >
            FAQ
          </button>
        </div>

        <Button
          variant={isScrolled ? 'primary' : 'secondary'}
          onClick={() => scrollToSection('cta')}
          className="text-base py-2 px-6"
        >
          Join Waitlist
        </Button>
      </nav>
    </motion.header>
  );
};
