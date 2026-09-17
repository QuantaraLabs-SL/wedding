'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeSection() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  return (
    <section className="py-20 mobile-padding relative bg-pure-white overflow-hidden border-t border-luxury-gold/10">
      <div className="w-full max-w-[360px] mx-auto text-center flex flex-col items-center">
        <h3 className="font-serif text-lg text-luxury-gold mb-2 uppercase tracking-widest font-semibold">
          Access Anytime
        </h3>
        <p className="font-sans text-mobile-small text-dark-text/70 mb-8 max-w-[280px]">
          Can&apos;t open the invitation on another device? Scan to view the invitation.
        </p>

        <div className="bg-white p-6 rounded-xl border border-luxury-gold/30 shadow-sm flex items-center justify-center">
          <QRCodeSVG 
            value={url} 
            size={180}
            fgColor="#24201A"
            bgColor="#FFFFFF"
            level="L"
          />
        </div>
      </div>
    </section>
  );
}
