export default function GoldFrame({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`p-1 bg-gold-gradient rounded-xl ${className}`}>
      <div className="bg-pure-white rounded-lg h-full w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
