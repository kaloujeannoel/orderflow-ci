"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = "2250789399776"; // Format international sans le +
  const message = encodeURIComponent("Bonjour l'équipe OrderFlow CI, j'ai besoin d'aide.");
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Contacter le support WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}