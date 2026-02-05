import React from 'react';

// Луна - просто эмодзи
export function PixelMoon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <span style={{ fontSize: size, color, lineHeight: 1 }}>🌙</span>
  );
}

// Пиксельное солнце (светлая тема)
export function PixelSun({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="7" y="0" width="2" height="2" fill={color} />
      <rect x="7" y="14" width="2" height="2" fill={color} />
      <rect x="0" y="7" width="2" height="2" fill={color} />
      <rect x="14" y="7" width="2" height="2" fill={color} />
      <rect x="2" y="2" width="2" height="2" fill={color} />
      <rect x="12" y="2" width="2" height="2" fill={color} />
      <rect x="2" y="12" width="2" height="2" fill={color} />
      <rect x="12" y="12" width="2" height="2" fill={color} />
      <rect x="5" y="4" width="6" height="2" fill={color} />
      <rect x="4" y="6" width="2" height="4" fill={color} />
      <rect x="10" y="6" width="2" height="4" fill={color} />
      <rect x="5" y="10" width="6" height="2" fill={color} />
      <rect x="6" y="6" width="4" height="4" fill={color} />
    </svg>
  );
}

// Пиксельная нота (звук вкл)
export function PixelSound({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="5" width="2" height="6" fill={color} />
      <rect x="4" y="4" width="2" height="8" fill={color} />
      <rect x="6" y="3" width="2" height="2" fill={color} />
      <rect x="6" y="11" width="2" height="2" fill={color} />
      <rect x="8" y="2" width="2" height="2" fill={color} />
      <rect x="8" y="12" width="2" height="2" fill={color} />
      <rect x="10" y="4" width="2" height="2" fill={color} />
      <rect x="10" y="10" width="2" height="2" fill={color} />
      <rect x="12" y="6" width="2" height="4" fill={color} />
    </svg>
  );
}

// Пиксельная нота (звук выкл - перечёркнуто)
export function PixelSoundOff({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="5" width="2" height="6" fill={color} />
      <rect x="4" y="4" width="2" height="8" fill={color} />
      <rect x="6" y="3" width="2" height="2" fill={color} />
      <rect x="6" y="11" width="2" height="2" fill={color} />
      {/* X mark */}
      <rect x="10" y="5" width="2" height="2" fill={color} />
      <rect x="14" y="5" width="2" height="2" fill={color} />
      <rect x="11" y="7" width="2" height="2" fill={color} />
      <rect x="13" y="7" width="2" height="2" fill={color} />
      <rect x="12" y="8" width="2" height="2" fill={color} />
      <rect x="11" y="9" width="2" height="2" fill={color} />
      <rect x="13" y="9" width="2" height="2" fill={color} />
      <rect x="10" y="11" width="2" height="2" fill={color} />
      <rect x="14" y="11" width="2" height="2" fill={color} />
    </svg>
  );
}

