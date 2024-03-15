import { createSlice } from '@reduxjs/toolkit';

//TODO: make username and author specific to logged in user
const newQuizSlice = createSlice({
  name: 'newQuiz',
  initialState: {
    newQuiz: {
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
      state.newQuiz = action.payload;
    }
  }
})

export const selectNewQuiz = (state) => state.newQuiz.newQuiz;

export const { updateNewQuiz } = newQuizSlice.actions

export default newQuizSlice.reducer