export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-slate-50">
      {/* Dégradé de fond très subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-white to-slate-50" />
      
      {/* Formes géométriques SVG en arrière-plan */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803D" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <path
          d="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1000,500 L1000,1000 L0,1000 Z"
          fill="url(#grad1)"
        />
        <path
          d="M0,600 C300,700 500,400 800,600 C900,650 1000,500 1000,600 L1000,1000 L0,1000 Z"
          fill="url(#grad2)"
        />
      </svg>
      
      {/* Grille de points subtile */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: "radial-gradient(circle, #94A3B8 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />
    </div>
  );
}