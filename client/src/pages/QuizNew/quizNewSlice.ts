import { createSlice } from '@reduxjs/toolkit';

import { Quiz } from '../../utilities/types';

//TODO: make username and author specific to logged in user
const quizNewSlice = createSlice({
  name: 'quizNew',
  initialState: {
    quiz: {
      title: '',
      questions: [],
      submissions: [],
      postingDate: new Date(),
      username: 'joekgilberto',
      author: '65f909f26f46ccb55d4c7665',
      category: ''
    }
  },
  reducers: {
    updateQuizNew(state, action) {
      state.quiz = action.payload;
    }
  }
})

export const selectNewQuiz = (state: { quizNew: { quiz: Quiz; }; }) => state.quizNew.quiz;

export const { updateQuizNew } = quizNewSlice.actions

export default quizNewSlice.reducer