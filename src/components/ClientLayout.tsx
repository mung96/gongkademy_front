'use client';
import rootReducer from '@/store/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
const store = configureStore({ reducer: rootReducer });

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Provider store={store}>{children}</Provider>;
}
