import './CategoryDelete.css';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Category, Quiz } from '../../utilities/types';

import Banner from '../../components/Banner/Banner';
import Loading from '../../components/Loading/Loading';

export default function CategoryDelete() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState<Category>({ title: '' });
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [formData, setFormData] = useState<Array<Quiz>>([]);

    async function handleRequest(): Promise<void> {
        await categoryServices.getCategory(id).then(async (c: Category) => {
            setCategory(c);
            await categoryServices.getAllCategories().then(async (cArray: Array<Category>) => {
                const cache: Array<Category> = [...cArray];
                const idx: number = cache.findIndex((cat) => cat.id === id);
                cache.splice(idx, 1);
                setCategories(cache);
                await quizServices.getQuizByCategory(c.id).then((q: Array<Quiz>) => {
                    setFormData(q);
                });
            })
        });
    };

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        const cache: Array<Quiz> = [...formData];
        cache[parseInt(e.target.name)].category = e.target.value;
        setFormData(cache);
    }

    async function handleUpdate(): Promise<void> {
        for (let quiz of formData) {
            await quizServices.updateQuiz(quiz.id, quiz);
        }
    }

    async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        await handleUpdate().then(async () => {
            await categoryServices.destroyCategory(id).then(() => {
                navigate(`/categories`);
            });
        })
    }

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        setFormData([]);
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
        <div className='CategoryDelete'>
            <Banner source={category.image ? category.image : 'https://images.unsplash.com/photo-1540835296355-c04f7a063cbb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} altText={category.title} sub={category.title} link={category.link ? category.link : 'https://unsplash.com/@olav_ahrens'} credit={category.credit ? category.credit : 'Olav Ahrens Røtne'} />
            <form onSubmit={handleSubmit}>
                {formData.length ?
                    formData.map((quiz: Quiz, idx: number) => {
                        return (
                            <label className='select'>
                                <p>{quiz.title}</p>
                                <select name={`${idx}`} defaultValue={''} onChange={handleChange} required>
                                    <option disabled value=''>Choose a Category</option>
                                    {categories.map((category: Category) => {
                                        return <option key={category.id} value={category.id}>{category.title}</option>
                                    })}
                                    <option value='new'>(New Category)</option>
                                </select>
                            </label>
                        )
                    })
                    :
                    <p className='none'>No quizzes to update, proceed below to delete.</p>
                }
                <div className='options'>
                    <input className='submit' type='submit' value='Delete' />
                    <button className='cancel' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}