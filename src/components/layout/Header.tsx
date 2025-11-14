import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 100);
    });
  }, [scrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false); // Close mobile menu when navigating
    if (!isHomePage) {
      // If not on homepage, navigate there first
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient-primary">reach</span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                How It Works
              </button>
              <Link
                to="/universities"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Universities
              </Link>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                About
              </button>
            </div>

            {/* Desktop CTA - Hidden on mobile */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('cta')}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-reach-blue to-reach-purple text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Join Waitlist
              </button>
            </div>

            {/* Mobile Hamburger - Hidden on desktop */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-white"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-midnight border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/60 p-2 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col px-6 space-y-1">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-white text-lg font-medium py-4 border-b border-white/10 hover:text-reach-blue transition-colors text-left"
          >
            How It Works
          </button>
          <Link
            to="/universities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white text-lg font-medium py-4 border-b border-white/10 hover:text-reach-blue transition-colors"
          >
            Universities
          </Link>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-white text-lg font-medium py-4 border-b border-white/10 hover:text-reach-blue transition-colors text-left"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-white text-lg font-medium py-4 border-b border-white/10 hover:text-reach-blue transition-colors text-left"
          >
            About
          </button>
        </div>

        {/* Mobile CTA Button */}
        <div className="px-6 mt-8">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToSection('cta');
            }}
            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-reach-blue to-reach-purple text-white font-medium hover:shadow-lg transition-all"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </>
  );
};
