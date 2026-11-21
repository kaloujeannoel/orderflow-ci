"use client";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-50">
      {/* Cercle 1 - Vert clair */}
      <div className="absolute -top-32 -left-32 h-[30rem] w-[30rem] animate-[float_10s_ease-in-out_infinite] rounded-full bg-brand-200/50 blur-3xl" />
      
      {/* Cercle 2 - Vert plus foncé */}
      <div className="absolute top-1/2 -right-32 h-[35rem] w-[35rem] animate-[float_12s_ease-in-out_infinite_1s] rounded-full bg-brand-300/40 blur-3xl" />
      
      {/* Cercle 3 - Orange (Accent) */}
      <div className="absolute -bottom-32 left-1/3 h-[25rem] w-[25rem] animate-[float_8s_ease-in-out_infinite_2s] rounded-full bg-amber-200/40 blur-3xl" />

      {/* Grille de points subtile */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: "radial-gradient(circle, #15803D 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />
    </div>
  );
}