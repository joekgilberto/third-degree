import { configureStore } from '@reduxjs/toolkit';

import quizNewReducer from '../pages/QuizNew/quizNewSlice';
import quizShowReducer from '../pages/QuizShow/quizShowSlice';

export const store = configureStore({
  reducer: {
    quizNew: quizNewReducer,
    quizShow: quizShowReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
