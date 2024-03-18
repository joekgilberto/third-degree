import { configureStore } from '@reduxjs/toolkit';

import navReducer from '../components/Nav/navSlice';
import quizNewReducer from '../pages/QuizNew/quizNewSlice';
import quizShowReducer from '../pages/QuizShow/quizShowSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    quizNew: quizNewReducer,
    quizShow: quizShowReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch