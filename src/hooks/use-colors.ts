import { useContext, useEffect, useState } from 'react';
import { Colors, ColorPalette } from '@/constants/colors';
import { ThemeContext } from '@/context/theme-context';

const useColors = (): ColorPalette => {
  const [colors, setColors] = useState<ColorPalette>(Colors.light);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setColors(Colors[theme.mode || 'light']);
  }, [theme]);

  return colors;
};

export default useColors;