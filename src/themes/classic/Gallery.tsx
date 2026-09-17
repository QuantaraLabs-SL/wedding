import { GalleryImageConfig } from '@/types/database';
import { motion } from 'framer-motion';
import Image from 'next/image';
import GoldOrnament from '@/components/ui/gold/GoldOrnament';
import GoldFrame from '@/components/ui/gold/GoldFrame';

export default function Gallery({ images }: { images: GalleryImageConfig[] }) {
  if (!images || images.length === 0) {
    return (
      <section className="py-24 px-6 relative bg-pure-white flex flex-col items-center">
        <h2 className="font-serif text-3xl md:text-5xl text-luxury-gold mb-8 text-center">
          Moments to Remember
        </h2>
        <div className="w-full max-w-2xl aspect-[16/9] border-2 border-luxury-gold/20 flex flex-col items-center justify-center rounded-xl p-8 text-center">
           <GoldOrnament className="w-12 h-12 mb-4 opacity-50" />
           <p className="text-luxury-gold uppercase tracking-widest text-sm opacity-70">
             Memories will be shared here soon.
           </p>
        </div>
      </section>
    );
  }

  // Simplified asymmetric layout for the example (first image large, others small)
  const featured = images[0];
  const others = images.slice(1);

  return (
    <section className="py-24 px-6 relative bg-pure-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-gold mb-6">
            Moments to Remember
          </h2>
          <GoldOrnament className="w-8 h-8 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 h-[50vh] md:h-[70vh] w-full"
          >
            <GoldFrame className="h-full w-full">
              <div className="relative h-full w-full">
                <Image
                  src={featured.image_url}
                  alt={featured.caption || "Featured moment"}
                  fill
                  className="object-cover"
                />
              </div>
            </GoldFrame>
          </motion.div>

          {others.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="h-[40vh] w-full"
            >
              <GoldFrame className="h-full w-full">
                <div className="relative h-full w-full">
                  <Image
                    src={img.image_url}
                    alt={img.caption || `Moment ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </GoldFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
