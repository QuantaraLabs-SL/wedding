import { WeddingConfig } from '@/types/database';
import Image from 'next/image';

export default function CoupleSection({ wedding }: { wedding: WeddingConfig }) {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto text-center">
      <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">
        The Happy Couple
      </h2>
      
      {wedding.couple_image_url && (
        <div className="relative w-64 h-80 mx-auto mb-10 rounded-t-full overflow-hidden shadow-xl">
          <Image
            src={wedding.couple_image_url}
            alt={`${wedding.bride_name} & ${wedding.groom_name}`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {wedding.invitation_message && (
        <p className="text-stone-600 leading-relaxed max-w-2xl mx-auto text-lg italic font-serif">
          &quot;{wedding.invitation_message}&quot;
        </p>
      )}
    </section>
  );
}
