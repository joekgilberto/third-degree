import { configureStore } from '@reduxjs/toolkit';

import app from '../App/appSlice';
import navReducer from '../components/Header/navSlice';
import quizNewReducer from '../pages/QuizNew/quizNewSlice';
import quizShowReducer from '../pages/QuizShow/quizShowSlice';
import quizEditReducer from '../pages/QuizEdit/quizEditSlice';
import authReducer from '../pages/Auth/authSlice';

export const store = configureStore({
  reducer: {
    app: app,
    nav: navReducer,
    quizNew: quizNewReducer,
    quizShow: quizShowReducer,
    quizEdit: quizEditReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;