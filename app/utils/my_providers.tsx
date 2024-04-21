"use client";

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect } from 'react';
import { AppDispatch, RootState, store } from './my_redux-store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getVoteInterval } from './my_redux-store/slices/intervalSlice';
import IsVotingTimeProvider from './my_context/is_voting_time_provider';


export default function MyProviders({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <IsVotingTimeProvider currentDate={new Date()}>
        <NextUIProvider>
          <NextThemesProvider
            attribute='class'
            defaultTheme='light'
            themes={['light', 'dark', 'modern']}
          >
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </IsVotingTimeProvider>
    </Provider>
  )
}