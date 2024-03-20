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

export async function getSubmission(id: string | undefined) {
    try {
        if(!id){
            throw Error('Error: id undefined.');
        }
        const res = await submissionsApi.show(id);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function getSubmissionList(ids: Array<string>): Promise<any> {
    try {
        const data: Array<Submission> = [];
        if(ids.length){
            for (let id of ids){
                const res = await submissionsApi.show(id);
                data.push(res.data);
            }
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

export async function updateSubmission(id: string | undefined, data: Submission) {
    try {
        if(!id){
            throw Error('Error: id undefined.');
        }
        const res = await submissionsApi.update(id, data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function destroySubmission(id: string | undefined) {
    try {
        if(!id){
            throw Error('Error: id undefined.');
        }
        const res = await submissionsApi.destroy(id);
        return res.data;
    } catch (err) {
        return err
    }
}