import axios from 'axios';
import { User } from '../types';

const BASE_URL = `${process.env.REACT_APP_API_URL}Users/`;

export async function show(id: string) {
    return axios
        .get(`${BASE_URL}${id}/`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function register(data: User) {
    console.log(BASE_URL)
    return axios
        .post(`${BASE_URL}register/`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

};

export async function login(data: {username: string, password: string}) {
    return axios
        .put(`${BASE_URL}login/`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

};