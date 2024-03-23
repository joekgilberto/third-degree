import * as categoriesApi from './category-api';
import * as tools from '../tools';
import { Category } from '../types';

export async function getAllCategories(): Promise<any> {
    try {
        const res = await categoriesApi.index();
        res.data.sort((a: Category, b: Category) => a.title.localeCompare(b.title))
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function getCategory(id: string | undefined): Promise<any> {
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

export async function createCategory(data: Category): Promise<any> {
    try {
        const title: string = tools.capitalize(data.title);
        const res = await categoriesApi.create({...data, title: title});
        return res.data;
    } catch (err) {
        return err;
    };
};

export async function updateCategory(id: string | undefined, data: Category): Promise<any> {
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

export async function destroyCategory(id: string | undefined): Promise<any> {
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