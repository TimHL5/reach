import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { TallyButton } from '../ui/TallyButton';

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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className={`text-2xl lg:text-3xl font-bold ${isScrolled ? 'text-reach-blue' : 'text-white'}`}>
                reach.
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className={`font-medium hover:text-reach-blue transition-colors ${
                  isScrolled ? 'text-midnight' : 'text-white'
                }`}
              >
                How it works
              </button>
              <Link
                to="/universities"
                className={`font-medium hover:text-reach-blue transition-colors ${
                  isScrolled ? 'text-midnight' : 'text-white'
                }`}
              >
                Universities
              </Link>
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

            {/* Desktop CTA - Hidden on mobile */}
            <div className="hidden lg:block">
              <TallyButton
                variant={isScrolled ? 'primary' : 'secondary'}
                className="text-base py-2 px-6"
              >
                Join Waitlist
              </TallyButton>
            </div>

            {/* Mobile Hamburger - Hidden on desktop */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 ${isScrolled ? 'text-midnight' : 'text-white'}`}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-600 p-2"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col px-6 space-y-1">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-gray-900 text-lg font-medium py-4 border-b border-gray-200 hover:text-reach-blue transition-colors text-left"
          >
            How it works
          </button>
          <Link
            to="/universities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-900 text-lg font-medium py-4 border-b border-gray-200 hover:text-reach-blue transition-colors"
          >
            Universities
          </Link>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-gray-900 text-lg font-medium py-4 border-b border-gray-200 hover:text-reach-blue transition-colors text-left"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-gray-900 text-lg font-medium py-4 border-b border-gray-200 hover:text-reach-blue transition-colors text-left"
          >
            FAQ
          </button>
        </div>

        {/* Mobile CTA Button */}
        <div className="px-6 mt-8">
          <TallyButton variant="primary" className="w-full">
            Join Waitlist
          </TallyButton>
        </div>
      </div>
    </>
  );
};
