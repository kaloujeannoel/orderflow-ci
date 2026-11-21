"use client";

export function OrderFlowIllustration() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none select-none">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl"
      >
        {/* Écran d'ordinateur */}
        <rect x="200" y="150" width="400" height="280" rx="12" fill="#15803D" />
        <rect x="220" y="170" width="360" height="240" rx="6" fill="#F8FAFC" />

        {/* Graphique animé sur l'écran */}
        <g>
          <rect x="250" y="350" width="40" height="40" fill="#22C55E">
            <animate attributeName="height" values="40;80;40" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y" values="350;310;350" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="310" y="310" width="40" height="80" fill="#4ADE80">
            <animate attributeName="height" values="80;40;80" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y" values="310;350;310" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="370" y="280" width="40" height="110" fill="#15803D">
            <animate attributeName="height" values="110;60;110" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="y" values="280;330;280" dur="3.5s" repeatCount="indefinite" />
          </rect>
          <rect x="430" y="330" width="40" height="60" fill="#86EFAC">
            <animate attributeName="height" values="60;100;60" dur="4.5s" repeatCount="indefinite" />
            <animate attributeName="y" values="330;290;330" dur="4.5s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* Lignes de texte (simulant l'interface) */}
        <rect x="250" y="200" width="120" height="10" rx="5" fill="#CBD5E1" />
        <rect x="250" y="225" width="80" height="10" rx="5" fill="#94A3B8" />
        <rect x="250" y="250" width="100" height="10" rx="5" fill="#CBD5E1" />

        {/* Pied de l'écran */}
        <rect x="350" y="430" width="100" height="40" fill="#475569" />
        <rect x="280" y="470" width="240" height="15" rx="7.5" fill="#64748B" />

        {/* Personnage (qui bouge) */}
        <g>
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,0" dur="4s" repeatCount="indefinite" />
          <circle cx="680" cy="300" r="30" fill="#14532D" />
          <rect x="650" y="335" width="60" height="90" rx="15" fill="#15803D" />
          <rect x="660" y="440" width="15" height="60" fill="#1E293B" />
          <rect x="685" y="440" width="15" height="60" fill="#1E293B" />
          {/* Bras tenant un ordinateur portable */}
          <rect x="560" y="350" width="80" height="50" rx="5" fill="#64748B" />
        </g>

        {/* Éléments flottants (nuages / données) */}
        <rect x="100" y="150" width="80" height="60" rx="10" fill="#F59E0B" opacity="0.8">
          <animate attributeName="y" values="150;120;150" dur="5s" repeatCount="indefinite" />
        </rect>
        <rect x="650" y="120" width="60" height="40" rx="8" fill="#FCD34D" opacity="0.8">
          <animate attributeName="y" values="120;90;120" dur="6s" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>
  );
}