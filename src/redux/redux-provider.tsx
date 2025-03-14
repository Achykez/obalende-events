"use client";

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './stores';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
};
