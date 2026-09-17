import { GalleryImageConfig } from '@/types/database';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';
import GoldFrame from '@/components/ui/gold/GoldFrame';

export default function Gallery({ images }: { images: GalleryImageConfig[] }) {
  if (!images || images.length === 0) {
    return (
      <section className="py-20 mobile-padding relative bg-pure-white flex flex-col items-center">
        <h2 className="font-serif heading-mobile text-luxury-gold mb-8 text-center uppercase tracking-widest">
          Moments to Remember
        </h2>
        <div className="w-full max-w-[320px] aspect-[4/5] border-2 border-luxury-gold/20 flex flex-col items-center justify-center rounded-xl p-8 text-center">
           <GoldOrnament className="w-12 h-12 mb-4 opacity-50" />
           <p className="text-luxury-gold uppercase tracking-widest text-mobile-small opacity-70">
             Memories will be shared here soon.
           </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 mobile-padding relative bg-pure-white overflow-hidden">
      <div className="w-full max-w-[360px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 flex flex-col items-center"
        >
          <h2 className="font-serif heading-mobile text-luxury-gold mb-4 uppercase tracking-widest">
            Our Moments
          </h2>
          <GoldOrnament className="w-6 h-6 mx-auto opacity-60" />
        </motion.div>

        <div className="flex flex-col gap-6">
          {images.map((img, idx) => {
            // Alternate between full-width (4:5) and landscape (3:2) for variety, but keep it single column on mobile
            const isPortrait = idx % 2 === 0;
            const aspectClass = isPortrait ? "aspect-[4/5]" : "aspect-[3/2]";
            
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`w-full ${aspectClass}`}
              >
                <GoldFrame className="h-full w-full">
                  <div className="relative h-full w-full">
                    <Image
                      src={img.image_url}
                      alt={img.caption || `Moment ${idx + 1}`}
                      fill
                      className="object-cover"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </GoldFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
