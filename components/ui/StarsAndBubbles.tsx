"use client";

export function StarsAndBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Bulles colorées en mouvement */}
      <div className="absolute top-[10%] left-[10%] h-24 w-24 rounded-full bg-green-400/30 blur-md animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-[60%] left-[20%] h-32 w-32 rounded-full bg-amber-400/30 blur-lg animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="absolute top-[20%] right-[10%] h-20 w-20 rounded-full bg-blue-400/30 blur-md animate-[float_7s_ease-in-out_infinite_2s]" />
      <div className="absolute bottom-[10%] right-[15%] h-40 w-40 rounded-full bg-purple-400/20 blur-xl animate-[float_10s_ease-in-out_infinite_0.5s]" />
      
      {/* Étoiles animées (qui grossissent et rétrécissent) */}
      <div className="absolute top-[15%] right-[30%] text-amber-400 animate-[pulse_2s_ease-in-out_infinite]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <div className="absolute bottom-[25%] left-[10%] text-brand-500 animate-[pulse_3s_ease-in-out_infinite_0.5s]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      <div className="absolute top-[70%] right-[20%] text-blue-400 animate-[pulse_2.5s_ease-in-out_infinite_1s]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      <div className="absolute top-[40%] left-[40%] text-yellow-300 animate-[pulse_4s_ease-in-out_infinite_2s]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
    </div>
  );
}