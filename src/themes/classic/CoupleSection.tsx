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
        <div className="relative w-full max-w-[320px] aspect-[4/5] mx-auto mb-10 rounded-t-[140px] rounded-b-[40px] overflow-hidden border-[3px] border-luxury-gold/50 shadow-2xl">
          <Image
            src={wedding.couple_image_url}
            alt={`${wedding.bride_name} & ${wedding.groom_name}`}
            fill
            className="object-cover object-top"
          />
        </div>
      )}

      {wedding.invitation_message && (
        <p className="text-dark-text opacity-90 leading-loose max-w-[320px] mx-auto text-mobile-body italic font-serif mt-6">
          &quot;{wedding.invitation_message}&quot;
        </p>
      )}
    </section>
  );
}
