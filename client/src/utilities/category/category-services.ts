import * as categoriesApi from './category-api';
import { Category } from '../types';

export async function getAllCategories() {
    try {
        const res = await categoriesApi.index();
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function getCategory(id: string | undefined) {
    if(!id){
        return 'Error: id not defined.';
    }
    try {
        const res = await categoriesApi.show(id);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function createCategory(data: Category) {
    try {
        const res = await categoriesApi.create(data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function updateCategory(id: string, data: Category) {
    try {
        const res = await categoriesApi.update(id, data);
        return res.data;
    } catch (err) {
        return err;
    }
}

export async function destroyCategory(id: string) {
    try {
        const res = await categoriesApi.destroy(id);
        return res.data;
    } catch (err) {
        return err
    }
}