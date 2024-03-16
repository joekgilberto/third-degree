import * as quizzesApi from './quiz-api';
import { Quiz } from '../types';

export async function getAllQuizzes() {
    try {
        const res = await quizzesApi.index();
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function getQuiz(id: string) {
    try {
        const res = await quizzesApi.show(id);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function getQuizByCategory(id: string) {
    try {
        const res = await quizzesApi.byCategory(id);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function createQuiz(data: Quiz) {
    try {
        const res = await quizzesApi.create(data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function updateQuiz(id: string, data: Quiz) {
    try {
        const res = await quizzesApi.update(id, data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function destroyQuiz(id: string) {
    try {
        const res = await quizzesApi.destroy(id);
        return res.data;
    } catch (err) {
        return err
    }
}