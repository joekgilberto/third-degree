import { configureStore } from '@reduxjs/toolkit';

import newQuizReducer from '../pages/NewQuiz/newQuizSlice';

export const store = configureStore({
  reducer: {
    newQuiz: newQuizReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
