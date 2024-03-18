import { configureStore } from '@reduxjs/toolkit';

import navReducer from '../components/Nav/navSlice';
import quizNewReducer from '../pages/QuizNew/quizNewSlice';
import quizShowReducer from '../pages/QuizShow/quizShowSlice';
import authReducer from '../pages/Auth/authSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    quizNew: quizNewReducer,
    quizShow: quizShowReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch