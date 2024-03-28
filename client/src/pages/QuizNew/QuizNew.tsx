import './QuizNew.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectNewQuiz, updateQuizNew } from './quizNewSlice';
import { updateCurrentPage } from '../../components/Header/navSlice';
import { selectUser } from '../../App/appSlice';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as categoryServices from '../../utilities/category/category-services';
import { Category, Question, Quiz, User } from '../../utilities/types';

import NewQuestion from '../../components/NewQuestion/NewQuestion';
import Loading from '../../components/Loading/Loading';

export default function QuizNew() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const newQuiz: Quiz = useSelector(selectNewQuiz);
    const user: User = useSelector(selectUser);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [newCategoryToggle, setNewCategoryToggle] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<string>();
    const [newQuestion, setNewQuestion] = useState<boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        dispatch(updateQuizNew({ ...newQuiz, [e.target.name]: e.target.value }));
    };

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>): void {
        if (e.target.value === 'new') {
            setNewCategoryToggle(true);
            dispatch(updateQuizNew({ ...newQuiz, category: '' }));
        } else {
            dispatch(updateQuizNew({ ...newQuiz, category: e.target.value }));
        };
    };

    function handleNewCategory(e: React.ChangeEvent<HTMLInputElement>): void {
        setNewCategory(e.target.value);
    };

    function handleExitCategory(): void {
        dispatch(updateQuizNew({ ...newQuiz, category: '' }));
        setNewCategoryToggle(false);
    };

    function addQuestion(type: string): void {
        setNewQuestion(false)
        dispatch(updateQuizNew({
            ...newQuiz,
            questions: [...newQuiz.questions, {
                id: newQuiz.questions.length,
                type: type,
                query: '',
                choices: {
                    a: '',
                    b: ''
                },
                answer: '',
                answers: []
            }]
        }));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        for (let i: number = 0; i < newQuiz.questions.length; i++) {
            if (newQuiz.questions[i].type === 'checkbox') {
                if (!newQuiz.questions[i].answers.length) {
                    console.log(`Error: No answer selected on question #${i + 1}`)
                    return;
                };
            };
        };

        if (newCategory) {
            categoryServices.createCategory({ title: newCategory }).then(async (category: Category) => {
                if (category.id) {
                    let cache = { ...newQuiz, category: category.id };
                    try {
                        await quizServices.createQuiz(cache).then((quiz: Quiz) => {
                            navigate(`/categories/${quiz.category}`)
                        });
                    } catch (err) {
                        console.log(err);
                    };
                } else {
                    console.log(`Error: Unable to create new category, "${newCategory}"`);
                    return;
                };
            });
        } else {
            try {
                await quizServices.createQuiz(newQuiz).then((quiz: Quiz) => {
                    navigate(`/categories/${quiz.category}`);
                });
            } catch (err) {
                console.log(err);
            };
        };
    };

    async function handleRequest(): Promise<void> {
        await categoryServices.getAllCategories().then((categories: Array<Category>) => {
            setCategories(categories);
        });
    };

    useEffect(() => {
        dispatch(updateCurrentPage('new'));
        dispatch(updateQuizNew({
            title: '',
            questions: [],
            submissions: [],
            postingDate: new Date(),
            username: user.username,
            author: user.id,
            category: ''

        }));
        handleRequest();
    }, []);

    if (!categories?.length) {
        return <Loading />;
    };

    return (
        <div className='QuizForm'>
            <h2>New Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-header'>
                    <div className='title'>
                        <input className='mono' name='title' placeholder='Enter Title' onChange={handleChange} />
                    </div>
                    {!newCategoryToggle ?
                        <select name='category' defaultValue={''} onChange={handleCategory} required>
                            <option disabled value=''>Choose a Category</option>
                            {categories.map((category: Category) => {
                                return <option key={category.id} value={category.id}>{category.title}</option>
                            })}
                            <option value='new'>(New Category)</option>
                        </select>
                        :
                        <div className='new-category'>
                            <input name='category' placeholder='Enter new category' onChange={handleNewCategory} required />
                            <button onClick={handleExitCategory}>X</button>
                        </div>
                    }
                </div>
                {newCategoryToggle ?
                    <div className='disclaimer'>
                        <p>*Third Degree recommends keeping category names concise and relevant.  Admins reserve the right to edit, merge, or delete any new categories.</p>
                    </div>
                    : null}
                <div className='questions'>
                    {newQuiz.questions?.map((question: Question, idx) => {
                        return (<>
                            <NewQuestion key={idx} question={question} />
                            <hr />
                        </>)
                    })}
                    <div className='add-question'>
                        {!newQuestion ?
                            <button onClick={(e) => setNewQuestion(true)}>+ Add a Question</button>
                            :
                            <>
                                <button onClick={(e) => addQuestion('text')}>Short Answer</button>
                                <button onClick={(e) => addQuestion('radio')}>Multiple Choice</button>
                                <button onClick={(e) => addQuestion('checkbox')}>Select All</button>
                                <button className='delete' onClick={(e) => setNewQuestion(false)}>X</button>
                            </>
                        }
                        {newQuiz.questions.length ?
                            <input type='submit' value='Submit' />
                            :
                            null}
                    </div>
                </div>
            </form>
        </div>
    );
}