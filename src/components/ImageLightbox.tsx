'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({ images, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === 'ArrowRight') onNavigate(Math.min(images.length - 1, currentIndex + 1));
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  const currentImage = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
        aria-label="Fermer"
      >
        <X size={24} />
      </button>

      {/* Compteur d'images */}
      <div className="absolute top-6 left-6 z-50 text-white text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation gauche */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          className="absolute left-6 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
          aria-label="Image précédente"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Navigation droite */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          className="absolute right-6 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 text-white"
          aria-label="Image suivante"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-full h-full flex items-center justify-center p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Titre de l'image */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-lg font-serif">{currentImage.alt}</p>
      </div>
    </motion.div>
  );
}
