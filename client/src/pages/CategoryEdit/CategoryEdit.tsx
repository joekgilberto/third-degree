import './CategoryEdit.css';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import { Category } from '../../utilities/types';

import Banner from '../../components/Banner/Banner';
import Loading from '../../components/Loading/Loading';

export default function CategoryEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState<Category>({ title: '' });
    const [formData, setFormData] = useState<Category>({ title: '' });

    async function handleRequest(): Promise<void> {
        await categoryServices.getCategory(id).then((c: Category) => {
            setCategory(c);
            setFormData(c);
        });
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const cache: Category = { ...formData, [e.target.name]: e.target.value };
        setFormData(cache);
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        await categoryServices.updateCategory(id, formData).then((c: Category) => {
            navigate(`/categories/${c.id}`);
        });
    }

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        setFormData(category);
        navigate(`/categories/${id}`);
    }

    useEffect(() => {
        dispatch(updateCurrentPage(''));
        handleRequest();
    }, []);

    if (!category) {
        return <Loading />;
    };

    return (
        <div className='CategoryEdit'>
            <Banner source={formData.image? formData.image : category.image ? category.image : 'https://images.unsplash.com/photo-1540835296355-c04f7a063cbb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} altText={category.title} sub={category.title} link={category.link ? category.link : 'https://unsplash.com/@olav_ahrens'} credit={category.credit ? category.credit : 'Olav Ahrens Røtne'} />
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Title</p>
                    <input name='title' value={formData.title?formData.title:''} placeholder='ex: Animals' onChange={handleChange} />
                </label>

                <label>
                    <p>Image Source</p>
                    <input name='image' value={formData.image?formData.image:''} placeholder='ex: https://unsplash.com/photos/image' onChange={handleChange} />
                </label>

                <label>
                    <p>Photographer Name</p>
                    <input name='credit' value={formData.credit?formData.credit:''} placeholder='ex: Joe Gilberto' onChange={handleChange} required={formData.image ? true : false} />
                </label>

                <label>
                    <p>Photographer Link</p>
                    <input name='link' value={formData.link?formData.link:''} placeholder='ex: https://unsplash.com/@joekgilberto' onChange={handleChange} />
                </label>

                <div className='options'>
                    <input type='submit' value={'Save'} />
                    <button className='cancel' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}