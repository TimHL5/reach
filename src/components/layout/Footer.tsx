import { Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-midnight text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">reach.</h3>
            <p className="text-gray-400">Your application workspace.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How it works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <button onClick={scrollToTop} className="text-gray-400 hover:text-white transition-colors">
                  Roadmap
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-reach-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-reach-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-reach-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <a
              href="mailto:hello@reachadmissions.app"
              className="text-gray-400 hover:text-white transition-colors"
            >
              hello@reachadmissions.app
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          © 2026 Reach Admissions. Built in Boston, scaling from Vietnam.
        </div>
      </div>
    </footer>
  );
};
