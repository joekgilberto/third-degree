import * as quizzesApi from './quiz-api';
import { Quiz } from '../types';

export async function getAllReviews() {
    try {
        const res = await quizzesApi.index();
        return res;
    } catch (err) {
        return err;
    }
}

export async function getReview(id: string) {
    try {
        const res = await quizzesApi.show(id);
        return res;
    } catch (err) {
        return err;
    }
}

export async function createReview(data: Quiz) {
    try {
        const res = await quizzesApi.create(data);
        return res;
    } catch (err) {
        return err;
    }
}

export async function updateReview(id: string, data: Quiz) {
    try {
        const res = await quizzesApi.update(id, data);
        return res;
    } catch (err) {
        return err;
    }
}

export async function destroyReview(id: string) {
    try {
        const res = await quizzesApi.destroy(id);
        return res;
    } catch (err) {
        return err
    }
}