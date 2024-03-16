import axios from 'axios';
import { Quiz } from '../types';

const BASE_URL = `${process.env.REACT_APP_REVIEWS_API_URL}Quizzes/`;

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

export async function create(data: Quiz) {
    return axios
        .post(BASE_URL, data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });

};

export async function update(id: string, data: Quiz) {
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