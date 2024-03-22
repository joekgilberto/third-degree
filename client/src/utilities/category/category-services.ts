import * as categoriesApi from './category-api';
import * as tools from '../tools';
import { Category } from '../types';

export async function getAllCategories() {
    try {
        const res = await categoriesApi.index();
        res.data.sort((a: Category, b: Category) => a.title.localeCompare(b.title))
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function getCategory(id: string | undefined) {
    try {
        if(!id){
            throw Error('Error: id undefined.');
        };
        const res = await categoriesApi.show(id);
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function createCategory(data: Category) {
    try {
        const title: string = tools.capitalize(data.title);
        const res = await categoriesApi.create({...data, title: title});
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function updateCategory(id: string | undefined, data: Category) {
    try {
        if(!id){
            throw Error('Error: id undefined.');
        };
        const res = await categoriesApi.update(id, data);
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function destroyCategory(id: string | undefined) {
    try {
        if(!id){
            throw Error('Error: id undefined.');
        };
        const res = await categoriesApi.destroy(id);
        return res.data;
    } catch (err) {
        return err;
    };
};