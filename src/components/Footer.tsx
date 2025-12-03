import { siteConfig } from '@/data/content';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cygne-brown text-cygne-cream pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-16">
        
        {/* Marque */}
        <div className="space-y-6">
            <h3 className="text-3xl font-serif text-white">{siteConfig.name}</h3>
            <p className="text-sm leading-loose opacity-80 max-w-xs font-light">
                Une invitation à la douceur de vivre alsacienne, dans un cadre authentique et raffiné.
            </p>
        </div>

        {/* Navigation */}
        <div>
            <h4 className="text-cygne-gold text-xs uppercase tracking-[0.2em] font-bold mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-light">
                <li><Link href="/appartements" className="hover:text-cygne-gold transition-colors">Nos Appartements</Link></li>
                <li><Link href="/infos" className="hover:text-cygne-gold transition-colors">Le Lieu & Accès</Link></li>
                <li><Link href="/adresses" className="hover:text-cygne-gold transition-colors">Découvrir Colmar</Link></li>
                <li><Link href="/reservation" className="hover:text-cygne-gold transition-colors">Réserver</Link></li>
            </ul>
        </div>

        {/* Contact */}
        <div>
            <h4 className="text-cygne-gold text-xs uppercase tracking-[0.2em] font-bold mb-8">Contact</h4>
            <div className="space-y-4 text-sm font-light">
                <a href={`tel:${siteConfig.contact.mobile}`} className="flex items-center gap-3 hover:text-cygne-gold transition-colors">
                    <Phone size={16} className="text-cygne-gold" />
                    {siteConfig.contact.phone}
                </a>
                <a href={`mailto:${siteConfig.contact.emailClient}`} className="flex items-center gap-3 hover:text-cygne-gold transition-colors">
                    <Mail size={16} className="text-cygne-gold" />
                    {siteConfig.contact.emailClient}
                </a>
                <div className="flex items-start gap-3 opacity-80">
                    <MapPin size={16} className="text-cygne-gold shrink-0 mt-1" />
                    <span className="max-w-[200px]">{siteConfig.contact.address}</span>
                </div>
            </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex justify-between items-center text-xs opacity-60">
        <p>© {new Date().getFullYear()} {siteConfig.name}.</p>
      </div>
    </footer>
  );
}