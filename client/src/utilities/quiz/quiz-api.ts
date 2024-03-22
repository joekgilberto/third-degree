import axios from 'axios';
import { Quiz } from '../types';

const BASE_URL = `${process.env.REACT_APP_API_URL}Quizzes/`;

export async function index(): Promise<any> {
    return axios
        .get(BASE_URL)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function show(id: string): Promise<any> {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    return axios
        .get(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function byCategory(id: string): Promise<any> {
    return axios
        .get(`${BASE_URL}category/${id}/`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function byAuthor(id: string): Promise<any> {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    return axios
        .get(`${BASE_URL}author/${id}/`, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function create(data: Quiz): Promise<any> {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    return axios
        .post(BASE_URL, data, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function update(id: string, data: Quiz): Promise<any> {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    return axios
        .put(`${BASE_URL}${id}/`, data, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export async function destroy(id: string): Promise<any> {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    return axios
        .delete(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};