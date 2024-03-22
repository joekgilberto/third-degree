import { createSlice } from '@reduxjs/toolkit';
import { Quiz } from '../../utilities/types';

const quizNewSlice = createSlice({
  name: 'quizNew',
  initialState: {
    quiz: {
      title: '',
      questions: [],
      submissions: [],
      postingDate: new Date(),
      username: '',
      author: '',
      category: ''
    }
  },
  reducers: {
    updateQuizNew(state, action) {
      state.quiz = action.payload;
    }
  }
});

export const selectNewQuiz = (state: { quizNew: { quiz: Quiz; }; }) => state.quizNew.quiz;

export const { updateQuizNew } = quizNewSlice.actions;

export default quizNewSlice.reducer;