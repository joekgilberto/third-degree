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

export async function getHardestQuizzes() {
    try {
        const res = await quizzesApi.index();

        res.data.sort((a: Quiz, b: Quiz) => {
            if (!a.avgScore && !b.avgScore) {
                return 0;
            } else if (!a.avgScore) {
                return 1;
            } else if (!b.avgScore){
                return -1;
            } else {
                return a.avgScore  - b.avgScore;
            };
        });

        if (res.data.length > 5){
            return res.data.slice(0,5);
        };

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

export async function getQuizByCategory(id: string | undefined) {
    if (!id) {
        return 'Error: id not defined.';
    }
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