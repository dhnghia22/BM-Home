import React, { useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import { Provider } from 'react-redux';
import store from '@/redux/store/store';

import { ThemeContext } from '@/context/theme-context';
import AppNavigation from '@/navigation/navigation';
import { ApiService } from '@/services/api-service';

ApiService.initService();

const App: () => React.ReactNode = () => {
  const initialTheme: Theme = { mode: Appearance.getColorScheme() }
  const [theme, setTheme] = useState<Theme>(initialTheme)

  const updateTheme = (newTheme?: Theme): void => {
    let mode: Theme['mode'];
    if (!newTheme) {
      mode = theme.mode === 'dark' ? 'light' : 'dark'
      newTheme = { mode }
    }
    setTheme(newTheme);
  }

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({mode: colorScheme});
    });
  }, [])

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <AppNavigation />
      </ThemeContext.Provider>
    </Provider>
  )
}

export default App
