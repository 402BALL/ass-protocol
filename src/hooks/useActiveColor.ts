import { useState, useCallback } from 'react';

type ColorName = 'yellow' | 'pink' | 'blue' | 'cyan' | 'coral' | 'purple' | 'orange' | 'lime' | null;

export function useActiveColor() {
  const [activeColor, setActiveColor] = useState<ColorName>(null);

  const setColor = useCallback((color: ColorName) => {
    setActiveColor(color);
    
    if (color) {
      // Устанавливаем на html для глобального эффекта
      document.documentElement.setAttribute('data-active-color', color);
      document.body.setAttribute('data-active-color', color);
      
      // Форсируем reflow для применения стилей
      void document.body.offsetHeight;
    } else {
      document.documentElement.removeAttribute('data-active-color');
      document.body.removeAttribute('data-active-color');
      
      // Форсируем reflow
      void document.body.offsetHeight;
    }
  }, []);

  const clearColor = useCallback(() => {
    setActiveColor(null);
    document.documentElement.removeAttribute('data-active-color');
    document.body.removeAttribute('data-active-color');
  }, []);

  return { activeColor, setColor, clearColor };
}
