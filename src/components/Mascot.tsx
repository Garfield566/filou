interface Props {
  mood?: 'happy' | 'sad';
  size?: number;
}

/** Filou the fox, the app's own mascot. */
export function Mascot({ mood = 'happy', size = 96 }: Props) {
  return (
    <svg className="mascot" width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Filou le renard">
      <path d="M18 12 L50 40 L22 62 Z" fill="#d94a1a" />
      <path d="M102 12 L70 40 L98 62 Z" fill="#d94a1a" />
      <path d="M26 24 L42 39 L27 50 Z" fill="#3b2a24" />
      <path d="M94 24 L78 39 L93 50 Z" fill="#3b2a24" />
      <path d="M14 56 C14 34 40 28 60 28 C80 28 106 34 106 56 C106 80 78 110 60 112 C42 110 14 80 14 56 Z" fill="#f4632e" />
      <path d="M14 58 C30 58 50 72 60 112 C42 110 14 80 14 58 Z" fill="#fff4e6" />
      <path d="M106 58 C90 58 70 72 60 112 C78 110 106 80 106 58 Z" fill="#fff4e6" />
      <circle cx="42" cy="60" r="6" fill="#2a1d18" />
      <circle cx="78" cy="60" r="6" fill="#2a1d18" />
      <circle cx="44" cy="58" r="2" fill="#fff" />
      <circle cx="80" cy="58" r="2" fill="#fff" />
      <path d="M52 86 Q60 80 68 86 Q64 95 60 96 Q56 95 52 86 Z" fill="#2a1d18" />
      {mood === 'happy' ? (
        <path d="M46 98 Q60 110 74 98" stroke="#2a1d18" strokeWidth="3" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M49 108 Q60 99 71 108" stroke="#2a1d18" strokeWidth="3" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}
