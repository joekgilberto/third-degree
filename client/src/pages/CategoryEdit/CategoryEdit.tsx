import './CategoryEdit.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../App/appSlice';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Category, User } from '../../utilities/types';

import Banner from '../../components/Banner/Banner';
import QuizCard from '../../components/QuizCard/QuizCard';
import Loading from '../../components/Loading/Loading';

export default function CategoryEdit() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [category, setCategory] = useState<Category>();
    const [formData, setFormData] = useState<Category>({ title: '' });

    async function handleRequest(): Promise<void> {
        await categoryServices.getCategory(id).then(async (c) => {
            setCategory(c);
            setFormData(c);
        });
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const cache: Category = { ...formData, [e.target.name]: e.target.value };
        setFormData(cache);
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>): Promise<void>{
        e.preventDefault();
        console.log(formData)
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
            <Banner source='https://images.unsplash.com/photo-1540835296355-c04f7a063cbb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' altText={category.title} sub={`Edit ${category.title}`} link='https://unsplash.com/@olav_ahrens' credit='Olav Ahrens Røtne' />
            <form onSubmit={handleSubmit}>
                <label>Title
                    <input name='title' value={formData.title} onChange={handleChange} />
                </label>

                <label>Image
                    <input name='image' value={formData.image} onChange={handleChange} />
                </label>

                <label>Photographer
                    <input name='credit' value={formData.credit} onChange={handleChange} required={formData.image ? true : false} />
                </label>

                <label>Photographer Link
                    <input name='link' value={formData.link} onChange={handleChange} />
                </label>
                <input type='submit' value={'Save'} />
            </form>
        </div>
    );
}