import { WeddingConfig } from '@/types/database';
import Image from 'next/image';

export default function CoupleSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section className="py-20 mobile-padding mx-auto text-center flex flex-col items-center">
      
      <div className="flex flex-col items-center justify-center space-y-4 mb-12 w-full">
        <h2 className="font-serif text-3xl text-luxury-gold uppercase tracking-wider">
          {wedding.bride_name}
        </h2>
        <div className="text-2xl text-bright-gold font-serif italic my-2">
          &hearts;
        </div>
        <h2 className="font-serif text-3xl text-luxury-gold uppercase tracking-wider">
          {wedding.groom_name}
        </h2>
      </div>

      {wedding.couple_image_url && (
        <div className="relative w-full max-w-[320px] aspect-[4/5] mx-auto rounded-t-[140px] rounded-b-[40px] overflow-hidden border-[3px] border-luxury-gold/50 shadow-2xl">
          <Image
            src={wedding.couple_image_url}
            alt={`${wedding.bride_name} & ${wedding.groom_name}`}
            fill
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center mb-10 -mt-6">
        <div className="px-8 py-4 bg-white shadow-2xl shadow-bright-gold/10 border border-bright-gold/30 rounded-2xl flex flex-col items-center text-center">
          <p className="font-serif italic text-luxury-gold text-sm mb-1">Join us for the</p>
          <h3 className="font-sans tracking-[0.15em] text-dark-text uppercase text-lg md:text-xl font-bold">Poruwa Ceremony</h3>
          <div className="flex items-center justify-center gap-3 mt-2 w-full">
            <span className="h-[1px] flex-1 bg-bright-gold/40"></span>
            <p className="font-sans text-bright-gold font-bold tracking-[0.2em] text-sm">10:15 AM</p>
            <span className="h-[1px] flex-1 bg-bright-gold/40"></span>
          </div>
        </div>
      </div>

      {wedding.invitation_message && (
        <p className="text-dark-text opacity-90 leading-loose max-w-[320px] mx-auto text-mobile-body italic font-serif mt-2">
          &quot;{wedding.invitation_message}&quot;
        </p>
      )}
    </section>
  );
}
