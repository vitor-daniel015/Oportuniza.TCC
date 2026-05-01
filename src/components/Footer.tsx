import React from 'react';
import { Logo } from './ui/Logo';
import { Facebook, Instagram, Twitter, Github, MapPin, Mail, Phone, Send, Figma, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue-depth text-white pt-32 pb-12 relative overflow-hidden">
      {/* Skewed Top Edge */}
      <div 
        className="absolute top-0 left-0 w-full h-32 bg-[#F4F7F9] -translate-y-1/2 -skew-y-3 origin-top-left"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-24">
          
          {/* Vertical Social Side Bar - Leftmost */}
          <div className="flex md:flex-col items-center justify-center gap-6 py-4 px-2">
            {[Facebook, Github, Send, Figma, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="text-white/60 hover:text-white transition-all transform hover:scale-110">
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Main Footer Grid */}
          <div className="flex-1 flex flex-col md:flex-row gap-12 items-start">
            {/* Logo and Spiral Section */}
            <div className="flex-1 relative min-h-[300px] flex flex-col justify-start">
              <div className="flex items-center gap-4 mb-12">
                <Logo />
              </div>
              
              {/* 3D Spiralled shape simulation using SVG - matches the blue/green visual */}
              <div className="relative w-72 h-72">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl opacity-90">
                    <defs>
                        <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4DA25A" />
                            <stop offset="50%" stopColor="#7EBC6A" />
                            <stop offset="100%" stopColor="#A8D67F" />
                        </linearGradient>
                    </defs>
                    {/* Simplified spiral representation inspired by image */}
                    {[...Array(6)].map((_, i) => (
                        <ellipse 
                            key={i}
                            cx="100" 
                            cy={150 - (i * 20)} 
                            rx={80 - (i * 8)} 
                            ry={30 - (i * 3)} 
                            fill="url(#spiralGrad)" 
                            opacity={0.8 - (i * 0.1)}
                            transform={`rotate(${i * 5} 100 100)`}
                        />
                    ))}
                </svg>
              </div>
            </div>

            {/* Links Columns Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:min-w-[450px]">
              {/* Links Column */}
              <div>
                <h4 className="text-xl font-black mb-8 tracking-tight">Links Rápidos</h4>
                <ul className="space-y-4 text-white/70 text-sm font-medium">
                  <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Funcionalidades</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a></li>
                </ul>
              </div>

              {/* Information Column */}
              <div>
                <h4 className="text-xl font-black mb-8 tracking-tight">Informações</h4>
                <ul className="space-y-6 text-white/70 text-sm">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                        <MapPin size={18} className="text-brand-green-sprout" />
                    </div>
                    <span className="leading-relaxed">Rua das Flores, 123 - Capela do Alto</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                        <Mail size={18} className="text-brand-green-sprout" />
                    </div>
                    <span>oportuniza.tcc@gmail.com</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                        <Phone size={18} className="text-brand-green-sprout" />
                    </div>
                    <span>(15) 99999-9999</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line and Copyright */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">© 2026 Oportuniza. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
