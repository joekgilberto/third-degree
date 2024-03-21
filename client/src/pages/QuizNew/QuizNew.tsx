import './QuizNew.css';

import React, { useEffect, useState } from 'react';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as categoryServices from '../../utilities/category/category-services';
import { selectNewQuiz, updateQuizNew } from './quizNewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Category, Question, Quiz, User } from '../../utilities/types';
import NewQuestion from '../../components/NewQuestion/NewQuestion';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage } from '../../components/Header/navSlice';
import * as localStorageTools from '../../utilities/local-storage';
import { selectUser } from '../../App/appSlice';

export default function QuizNew() {

    const navigate = useNavigate();
    //TODO: Reset quiz everytime you open the page
    const newQuiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    const [newCategoryToggle, setNewCategoryToggle] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<string>();
    const [newQuestion, setNewQuestion] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const user = useSelector(selectUser);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(updateQuizNew({ ...newQuiz, [e.target.name]: e.target.value }))
    }

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === 'new') {
            setNewCategoryToggle(true);
            dispatch(updateQuizNew({ ...newQuiz, category: '' }))
        } else {
            dispatch(updateQuizNew({ ...newQuiz, category: e.target.value }))
        };
    };

    function handleNewCategory(e: React.ChangeEvent<HTMLInputElement>) {
        setNewCategory(e.target.value);
    }

    function handleExitCategory() {
        dispatch(updateQuizNew({ ...newQuiz, category: '' }))
        setNewCategoryToggle(false);
    }

    function addQuestion(type: string) {
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
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        for (let i: number = 0; i < newQuiz.questions.length; i++) {
            if (newQuiz.questions[i].type === 'checkbox') {
                if (!newQuiz.questions[i].answers.length) {
                    console.log(`Error: No answer selected on question #${i + 1}`)
                    return;
                }
            }
        }

        if (newCategory) {
            categoryServices.createCategory({ title: newCategory }).then(async (category: Category) => {
                if (category.id) {
                    let cache = { ...newQuiz, category: category.id };
                    try {
                        await quizServices.createQuiz(cache).then((quiz: Quiz) => {
                            navigate(`/categories/${quiz.category}`)
                        });
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    console.log(`Error: Unable to create new category, "${newCategory}"`)
                    return;
                }

            })
        } else {
            try {
                await quizServices.createQuiz(newQuiz).then((quiz: Quiz) => {
                    navigate(`/categories/${quiz.category}`)
                });
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function handleRequest() {
        await categoryServices.getAllCategories().then((categories: Array<Category>) => {
            setCategories(categories)
        })
    }

    useEffect(() => {
        dispatch(setCurrentPage('new'));
        dispatch(updateQuizNew({
            title: '',
            questions: [],
            submissions: [],
            postingDate: new Date(),
            username: user.username,
            author: user.id,
            category: ''

        }))
        handleRequest();
    }, [])

    if (!categories?.length) {
        return <p>Loading...</p>
    }

    return (
        <div className='QuizNew'>
            <h2>New Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-header'>
                    <input name='title' placeholder='Enter Title' onChange={handleChange} />
                    {!newCategoryToggle ?
                        <select name='category' defaultValue={''} onChange={handleCategory} required>
                            <option disabled value=''>Choose a Category</option>
                            {categories.map((category: Category) => {
                                return <option key={category.id} value={category.id}>{category.title}</option>
                            })}
                            <option value='new'>(New Category)</option>
                        </select>
                        :
                        <>
                            <input name='category' placeholder='Enter new category' onChange={handleNewCategory} required />
                            <button onClick={handleExitCategory}>X</button>
                        </>
                    }
                </div>
                {newCategoryToggle ?
                    <div className='form-note'>
                        <p>*Please create a new category at your own discretion.  We here at Third Degree recommend keeping category names concise and relevant.  Admins reserve the right to edit, merge, or delete any new categories.</p>
                    </div>
                    : null}
                <div>
                    {newQuiz.questions?.map((question: Question, idx) => {
                        return (<>
                            <NewQuestion key={idx} question={question} />
                            <hr />
                        </>)
                    })}
                    <div>
                        {!newQuestion ?
                            <button onClick={(e) => setNewQuestion(true)}>+ Add a Question</button>
                            :
                            <div className='form-question-options'>
                                <button onClick={(e) => addQuestion('text')}>Short Answer</button>
                                <button onClick={(e) => addQuestion('radio')}>Multiple Choice</button>
                                <button onClick={(e) => addQuestion('checkbox')}>Select All</button>
                                <button onClick={(e) => setNewQuestion(false)}>X</button>
                            </div>
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