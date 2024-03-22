import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz } from '../../utilities/types';

export const loadQuiz = createAsyncThunk(
  'quizEdit/loadQuiz',
  async (id: string | undefined) => {
    if (!id) {
      throw Error('Error: id undefined.');
    }
    return await quizServices.getQuiz(id);
  }
);

const quizEditSlice = createSlice({
  name: 'quizEdit',
  initialState: {
    quiz: {
      title: '',
      questions: [],
      submissions: [],
      postingDate: '',
      username: '',
      author: '',
      category: ''
    },
    isLoadingQuiz: false,
    hasQuizError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuiz.pending, (state) => {
        state.isLoadingQuiz = true;
        state.hasQuizError = false;
      })
      .addCase(loadQuiz.fulfilled, (state, action) => {
        state.isLoadingQuiz = false;
        state.quiz = action.payload;
      })
      .addCase(loadQuiz.rejected, (state) => {
        state.isLoadingQuiz = false;
        state.hasQuizError = true;
        state.quiz = {
          title: '',
          questions: [],
          submissions: [],
          postingDate: '',
          username: '',
          author: '',
          category: ''
        };
      });
  },
  reducers: {
    updateQuizEdit(state, action) {
      state.quiz = action.payload;
    }
  }
});

export const selectEditQuiz = (state: { quizEdit: { quiz: Quiz; }; }) => state.quizEdit.quiz;

export const isLoading = (state: { quizEdit: { isLoadingQuiz: boolean; }; }) => state.quizEdit.isLoadingQuiz;

export const hasError = (state: { quizEdit: { hasQuizError: boolean; }; }) => state.quizEdit.hasQuizError;

export const { updateQuizEdit } = quizEditSlice.actions;

export default quizEditSlice.reducer;