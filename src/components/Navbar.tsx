import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Logo } from './ui/Logo';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC<{ onAuthClick: () => void }> = ({ onAuthClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Sobre Nós', href: '#' },
    { name: 'Contato', href: '#' },
  ];

  return (
    <div className="relative w-full pt-8 pb-12 overflow-hidden">
      {/* Background Gradient Decorative Areas */}
      <div className="absolute top-0 left-0 w-1/3 h-64 bg-brand-blue-depth rounded-br-[100px] -z-10" />
      <div className="absolute top-0 right-0 w-2/3 h-64 bg-gradient-to-r from-brand-blue-depth to-brand-green-sprout rounded-bl-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Logo outside the pill */}
        <div className="mb-6">
          <Logo />
        </div>

        {/* Floating Navbar Pill */}
        <nav className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 mx-auto max-w-5xl">
          <div className="px-8 flex justify-between items-center h-20">
            <div className="hidden md:flex flex-1 justify-center gap-20">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary hover:text-brand-blue-depth font-semibold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex-shrink-0">
               <button 
                onClick={onAuthClick}
                className="bg-brand-blue-depth hover:bg-[#153a5c] text-white px-10 py-3 rounded-lg font-bold transition-all shadow-md"
              >
                Acessar
              </button>
            </div>

            {/* Mobile Menu Button - inside the pill */}
            <div className="md:hidden flex items-center ml-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-blue-depth p-2 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-100 overflow-hidden"
              >
                <div className="px-6 py-4 space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 text-base font-bold text-text-secondary hover:text-brand-blue-depth rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
};
