//Imports thunk and slice tools from Redux toolkit and custom tvmaze and review services API tools
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as submissionServices from '../../utilities/submission/submission-services';
import { Quiz, Submission } from '../../utilities/types';

//Creates an async thunk to call a shows based on a passed through id, along with its reviews, and then calculates the average of its reviews
export const loadQuiz = createAsyncThunk(
    'quizShow/loadQuiz',
    async (id: string | undefined) => {
        if(!id){
            return 'Error: Invalid id.';
        }
        return await quizServices.getQuiz(id);
    }
);

//Creates and showSlice with show, reviews, average, isLoading, and error state, along with its reducers
export const quizSlice = createSlice({
    name: 'quizShow',
    initialState: {
        quiz: {},
        submission: {},
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
                state.quiz = {};
            });
    },
    reducers: {
        updateSubmissionNew(state, action) {
          state.submission = action.payload;
        }
      }
});

//Exports state, actions, and reducer
export const selectQuiz = (state: { quizShow: { quiz: Quiz; }; }) => state.quizShow.quiz;

export const selectSubmission = (state: { quizShow: { submission: Submission; }; }) => state.quizShow.submission;

export const isLoading = (state: { quizShow: { isLoadingQuiz: boolean; }; }) => state.quizShow.isLoadingQuiz;

export const hasError = (state: { quizShow: { hasQuizError: boolean; }; }) => state.quizShow.hasQuizError;

export const { updateSubmissionNew } = quizSlice.actions

export default quizSlice.reducer;