import * as quizzesApi from './quiz-api';
import * as submissionServices from '../submission/submission-services';
import * as userServices from '../user/user-services';
import { Quiz, Submission, User } from '../types';

export async function getAllQuizzes(): Promise<any> {
    try {
        const res = await quizzesApi.index();
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function getHardestQuizzes(): Promise<any> {
    try {
        const res = await quizzesApi.index();

        res.data.sort((a: Quiz, b: Quiz) => {
            if (!a.avgScore && !b.avgScore) {
                return 0;
            } else if (!a.avgScore) {
                return 1;
            } else if (!b.avgScore) {
                return -1;
            } else {
                return a.avgScore - b.avgScore;
            };
        });

        if (res.data.length > 5) {
            return res.data.slice(0, 5);
        };

        return res.data;
    } catch (err) {
        return err;
    };
};

export async function getQuiz(id: string | undefined): Promise<any> {
    try {
        if (!id) {
            throw Error('Error: id undefined.');
        };
        const res = await quizzesApi.show(id);
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function getQuizByCategory(id: string | undefined): Promise<any> {
    try {
        if (!id) {
            throw Error('Error: id undefined.');
        };
        const res = await quizzesApi.byCategory(id);
        res.data.sort((a: Quiz, b: Quiz) => a.title.localeCompare(b.title))
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function getQuizsesByAuthor(id: string): Promise<any> {
    try {
        const res = await quizzesApi.byAuthor(id);
        res.data.sort((a: Quiz, b: Quiz) => a.title.localeCompare(b.title));
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function createQuiz(data: Quiz): Promise<any> {
    try {
        const res = await quizzesApi.create(data);
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function updateQuiz(id: string | undefined, data: Quiz): Promise<any> {
    try {
        if (!id) {
            throw Error('Error: id undefined.');
        };
        const res = await quizzesApi.update(id, data);
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function destroyQuiz(id: string | undefined): Promise<any> {
    try {
        if (!id) {
            throw Error('Error: id undefined.');
        };
        return await quizzesApi.destroy(id).then(async () => {
            return await submissionServices.getAllSubmissions().then(async (submissions: Array<Submission>) => {
                if (submissions.length) {
                    const quizSubmissions = submissions.filter((submission: Submission) => {
                        return submission.quiz === id;
                    });
                    for (let submission of quizSubmissions) {
                        await userServices.getUser(submission.challenger).then(async (user: User) => {
                            if (submission.id) {
                                const userSubmissions: Array<string> = [...user.submissions];
                                const idx: number = userSubmissions.indexOf(submission.id);
                                if (idx !== -1){
                                    userSubmissions.splice(idx,1);
                                    await userServices.addSubmission(user.id, userSubmissions);
                                };
                            };
                        });
                        await submissionServices.destroySubmission(submission.id);
                        return {};
                    };
                };
            });
        });
    } catch (err) {
        return err;
    };
};