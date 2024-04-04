import { configureStore } from '@reduxjs/toolkit';
import template from './template';

const rootStore = configureStore({
  reducer: {
    template,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;

export default rootStore;
