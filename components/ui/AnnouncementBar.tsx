export function AnnouncementBar() {
  return (
    <div className="relative flex overflow-x-hidden bg-brand-600 py-2 text-white">
      {/* Premier bloc */}
      <div className="animate-marquee whitespace-nowrap flex gap-4 text-lg font-semibold shrink-0">
        <span>Nouveau : disponible en Côte d'Ivoire</span>
        <span>•</span>
        <span>Gérez votre commerce. Développez vos ventes.</span>
      </div>

      {/* Deuxième bloc (pour l'effet de boucle infinie) */}
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-4 text-lg font-semibold shrink-0 py-2">
        <span>Nouveau : disponible en Côte d'Ivoire</span>
        <span>•</span>
        <span>Gérez votre commerce. Développez vos ventes.</span>
      </div>
    </div>
  );
}