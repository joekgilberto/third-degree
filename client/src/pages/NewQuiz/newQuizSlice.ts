import { createSlice } from '@reduxjs/toolkit';

import { Quiz } from '../../utilities/types';

//TODO: make username and author specific to logged in user
const newQuizSlice = createSlice({
  name: 'newQuiz',
  initialState: {
    quiz: {
      title: '',
      questions: [],
      submissions: [],
      postingDate: new Date(),
      username: 'joekgilberto',
      author: '65ee2084f86b1b2bc8530705',
      category: ''
    }
  },
  reducers: {
    updateNewQuiz(state, action) {
      state.quiz = action.payload;
    }
  }
})

export const selectNewQuiz = (state: { newQuiz: { quiz: Quiz; }; }) => state.newQuiz.quiz;

export const { updateNewQuiz } = newQuizSlice.actions

export default newQuizSlice.reducer