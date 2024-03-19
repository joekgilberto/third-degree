import * as usersApi from './user-api';
import { User } from '../types';

export async function getUser(username: string) {
    try {
        const res = await usersApi.show(username);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function registerUser(data: User) {
    try {
        const res = await usersApi.register(data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function loginUser(data: {username: string, password: string}) {
    try {
        const res = await usersApi.login(data);
        return res.data;
    } catch (err) {
        return err;
    }
}