export default function GoldOrnament({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`text-luxury-gold ${className}`} 
      width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="currentColor"/>
      <circle cx="50" cy="50" r="10" fill="white"/>
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
    </svg>
  );
}
