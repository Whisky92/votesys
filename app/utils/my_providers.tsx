"use client";

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { store } from './my_redux-store/store';
import { Provider } from 'react-redux';

export default function MyProviders({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
        <NextUIProvider>
          <NextThemesProvider
            attribute='class'
            defaultTheme='light'
            themes={['light', 'dark', 'modern']}
          >
            {children}
          </NextThemesProvider>
        </NextUIProvider>
    </Provider>
  )
}