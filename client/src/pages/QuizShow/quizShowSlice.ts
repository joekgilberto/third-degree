import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Submission } from '../../utilities/types';

export const loadQuiz = createAsyncThunk(
    'quizShow/loadQuiz',
    async (id: string | undefined) => {
        if (!id) {
            throw Error('Error: id undefined.');
        };
        return await quizServices.getQuiz(id);
    }
);

export const quizSlice = createSlice({
    name: 'quizShow',
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
        submission: {
            answers: [],
            score: 0,
            submissionDate: new Date(),
            username: '',
            challenger: '',
            quiz: ''
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
        updateSubmissionNew(state, action) {
            state.submission = action.payload;
        }
    }
});

export const selectQuiz = (state: { quizShow: { quiz: Quiz; }; }) => state.quizShow.quiz;

export const selectSubmission = (state: { quizShow: { submission: Submission; }; }) => state.quizShow.submission;

export const isLoading = (state: { quizShow: { isLoadingQuiz: boolean; }; }) => state.quizShow.isLoadingQuiz;

export const hasError = (state: { quizShow: { hasQuizError: boolean; }; }) => state.quizShow.hasQuizError;

export const { updateSubmissionNew } = quizSlice.actions;

export default quizSlice.reducer;