import * as submissionsApi from './submission-api';
import * as userServices from '../user/user-services';
import * as localStorageTools from '../local-storage';
import { Submission, User } from '../types';

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
        if (!id) {
            throw Error('Error: id undefined.');
        }
        const res = await submissionsApi.show(id);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function getUserSubmissions(user: User): Promise<any> {
    try {
        const data: Array<Submission> = [];
        if (user.submissions.length) {
            for (let i: number = 0; i < user.submissions.length; i++) {
                await submissionsApi.show(user.submissions[i]).then(async (res) => {
                    if (res.data) {
                        data.push(res.data);
                    } else {
                        const idsCache: Array<string> = [...user.submissions];
                        idsCache.splice(i, 1);
                        await userServices.addSubmission(user.id, idsCache).then((updatedUser: User)=>{
                            const currentUser = localStorageTools.getUser();
                            if(user.id === currentUser?.id){
                                localStorageTools.setUser(updatedUser);
                            }
                        });
                    }
                });
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
        if (!id) {
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
        if (!id) {
            throw Error('Error: id undefined.');
        }
        const res = await submissionsApi.destroy(id);
        return res.data;
    } catch (err) {
        return err
    }
}