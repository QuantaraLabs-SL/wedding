import GoldOrnament from './GoldOrnament';

export default function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-luxury-gold"></div>
      <GoldOrnament className="w-6 h-6" />
      <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-luxury-gold"></div>
    </div>
  );
}
