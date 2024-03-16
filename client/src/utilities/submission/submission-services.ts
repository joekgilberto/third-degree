import * as submissionsApi from './submission-api';
import { Submission } from '../types';

export async function getAllSubmissions() {
    try {
        const res = await submissionsApi.index();
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function getSubmission(id: string) {
    try {
        const res = await submissionsApi.show(id);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function getQuizSubmissions(ids: Array<string>) {
    try {
        const data: Array<Submission> = [];
        for (let id of ids){
            const res = await submissionsApi.show(id);
            data.push(res.data);
        }
        return data;
    } catch (err) {
        return err;
    }
}

export async function createSubmission(data: Submission) {
    try {
        const res = await submissionsApi.create(data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function updateSubmission(id: string, data: Submission) {
    try {
        const res = await submissionsApi.update(id, data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function destroySubmission(id: string) {
    try {
        const res = await submissionsApi.destroy(id);
        return res.data;
    } catch (err) {
        return err
    }
}