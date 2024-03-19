import axios from 'axios';
import { Submission } from '../types';

const BASE_URL = `${process.env.REACT_APP_API_URL}Submissions/`;

export async function index() {
    return axios
        .get(BASE_URL)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

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

export async function create(data: Submission) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .post(BASE_URL, data, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

};

export async function update(id: string, data: Submission) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .put(`${BASE_URL}${id}/`, data, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

};

export async function destroy(id: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    return axios
        .delete(`${BASE_URL}${id}/`, config)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
}