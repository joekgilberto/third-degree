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
    return axios
        .post(BASE_URL, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

};

export async function update(id: string, data: Submission) {
    return axios
        .put(`${BASE_URL}${id}/`, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

};

export async function destroy(id: string) {
    return axios
        .delete(`${BASE_URL}${id}/`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
}