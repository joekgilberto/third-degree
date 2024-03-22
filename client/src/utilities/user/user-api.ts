import axios from 'axios';
import { Credentials } from '../types';

const BASE_URL = `${process.env.REACT_APP_API_URL}Users/`;

export async function show(id: string): Promise<any> {
    return axios
        .get(`${BASE_URL}${id}/`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function register(data: Credentials): Promise<any> {
    return axios
        .post(`${BASE_URL}register/`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function login(data: Credentials): Promise<any> {
    return axios
        .put(`${BASE_URL}login/`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function submit(id: string, data: Array<string>): Promise<any> {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    return axios
        .put(`${BASE_URL}submit/${id}/`, data, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};