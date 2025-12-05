'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function ReservitBooking() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* jQuery */}
      <Script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        strategy="afterInteractive"
      />

      {/* Iframe de réservation intégré */}
      <div className="w-full relative">
        {/* Loader pendant le chargement */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cygne-cream/50 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cygne-gold mb-4"></div>
              <p className="text-cygne-brown text-sm uppercase tracking-wider">
                Chargement du système de réservation...
              </p>
            </div>
          </div>
        )}

        <iframe
          src="https://secure.reservit.com/engine/booking/2/254654"
          className="w-full border-0"
          style={{
            minHeight: '800px',
            height: 'calc(100vh - 100px)',
            maxHeight: '1200px'
          }}
          title="Système de réservation Reservit"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </>
  );
}
