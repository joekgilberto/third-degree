import * as usersApi from './user-api';
import { Credentials } from '../types';

export async function getUser(username: string) {
    try {
        const res = await usersApi.show(username);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function registerUser(data: Credentials) {
    try {
        const res = await usersApi.register(data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function loginUser(data: Credentials) {
    try {
        const res = await usersApi.login(data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function addSubmission(id: string, submissions: Array<string>){
    try {
        const res = await usersApi.submit(id, submissions);
        return res.data;
    } catch (err) {
        return err;
    }
}