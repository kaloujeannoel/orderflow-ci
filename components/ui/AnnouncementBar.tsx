export function AnnouncementBar() {
  return (
    <div className="relative flex overflow-x-hidden bg-brand-600 py-2 text-white">
      <div className="animate-marquee whitespace-nowrap flex gap-8 text-lg font-semibold">
        <span>Nouveau : disponible en Côte d&apos;Ivoire</span>
        <span>•</span>
        <span>Gérez votre commerce. Développez vos ventes.</span>
        <span>•</span>
        <span>Nouveau : disponible en Côte d&apos;Ivoire</span>
        <span>•</span>
        <span>Gérez votre commerce. Développez vos ventes.</span>
        <span>•</span>
      </div>

      <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 text-lg font-semibold">
        <span>Nouveau : disponible en Côte d&apos;Ivoire</span>
        <span>•</span>
        <span>Gérez votre commerce. Développez vos ventes.</span>
        <span>•</span>
        <span>Nouveau : disponible en Côte d&apos;Ivoire</span>
        <span>•</span>
        <span>Gérez votre commerce. Développez vos ventes.</span>
        <span>•</span>
      </div>
    </div>
  );
}