'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Appartements', href: '/appartements' },
    { name: 'Le Lieu', href: '/infos' },
    { name: 'Colmar', href: '/adresses' },
    { name: 'Réserver', href: '/reservation' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#EAE5D9]/95 py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-serif font-medium tracking-tight z-50 text-cygne-brown hover:text-cygne-gold transition-colors duration-300"
        >
          Les Suites du Cygne.
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.15em] font-bold transition-colors ${
                    isActive
                      ? 'text-cygne-gold'
                      : 'text-cygne-brown hover:text-cygne-gold'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 text-cygne-brown">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Fullscreen */}
        <div className={`fixed inset-0 bg-cygne-cream flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-serif transition-colors ${
                      isActive
                        ? 'text-cygne-gold'
                        : 'text-cygne-brown'
                    }`}
                >
                    {link.name}
                </Link>
              );
            })}
        </div>
      </div>
    </nav>
  );
}