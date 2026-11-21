"use client";

export function AnimatedIllustration() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[80%] w-[80%]"
      >
        {/* Ordinateur */}
        <rect x="100" y="150" width="300" height="200" rx="10" fill="#15803D" />
        <rect x="120" y="170" width="260" height="160" rx="5" fill="#F8FAFC" />
        
        {/* Écran : Graphiques animés */}
        <rect x="140" y="190" width="80" height="10" rx="2" fill="#CBD5E1">
          <animate attributeName="width" values="80;120;80" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="140" y="210" width="120" height="10" rx="2" fill="#94A3B8">
          <animate attributeName="width" values="120;60;120" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="140" y="230" width="60" height="10" rx="2" fill="#CBD5E1">
           <animate attributeName="width" values="60;100;60" dur="5s" repeatCount="indefinite" />
        </rect>

        {/* Boutons / Cartes animées */}
        <rect x="240" y="190" width="120" height="50" rx="5" fill="#DCFCE7" />
        <circle cx="260" cy="215" r="10" fill="#22C55E">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <rect x="280" y="205" width="60" height="6" rx="3" fill="#15803D" />
        <rect x="280" y="218" width="40" height="6" rx="3" fill="#86EFAC" />

        {/* Pied de l'écran */}
        <rect x="220" y="350" width="60" height="40" fill="#64748B" />
        <rect x="180" y="390" width="140" height="10" rx="5" fill="#475569" />

        {/* Personnage (simplifié) */}
        <circle cx="400" cy="250" r="20" fill="#14532D" />
        <rect x="380" y="270" width="40" height="60" rx="10" fill="#15803D" />
        
        {/* Animation du personnage */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="3s" repeatCount="indefinite" />
          <circle cx="400" cy="250" r="20" fill="#14532D" />
          <rect x="380" y="270" width="40" height="60" rx="10" fill="#15803D" />
        </g>

        {/* Cercles flottants en arrière-plan */}
        <circle cx="80" cy="100" r="30" fill="#86EFAC" opacity="0.5">
          <animate attributeName="cy" values="100;80;100" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="450" cy="400" r="50" fill="#4ADE80" opacity="0.3">
          <animate attributeName="cy" values="400;420;400" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}