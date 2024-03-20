import './QuizEdit.css';

import React, { useEffect, useState } from 'react';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as categoryServices from '../../utilities/category/category-services';
import { selectEditQuiz, updateQuizEdit, loadQuiz, isLoading } from './quizEditSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Category, Question, Quiz, User } from '../../utilities/types';
import EditQuestion from '../../components/EditQuestion/EditQuestion';
import { useNavigate, useParams } from 'react-router-dom';
import { setCurrentPage } from '../../components/Nav/navSlice';
import * as localStorageTools from '../../utilities/local-storage';
import { AppDispatch } from '../../App/store';

export default function QuizEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const editQuiz = useSelector(selectEditQuiz);
    const loading = useSelector(isLoading);
    const dispatch = useDispatch<AppDispatch>();

    const [newCategoryToggle, setNewCategoryToggle] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<string>();
    const [editQuestion, setEditQuestion] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [user, setUser] = useState<User | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(updateQuizEdit({ ...editQuiz, [e.target.name]: e.target.value }))
    }

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === 'new') {
            setNewCategoryToggle(true);
            dispatch(updateQuizEdit({ ...editQuiz, category: '' }))
        } else {
            dispatch(updateQuizEdit({ ...editQuiz, category: e.target.value }))
        };
    };

    function handleNewCategory(e: React.ChangeEvent<HTMLInputElement>) {
        setNewCategory(e.target.value);
    }

    function handleExitCategory() {
        dispatch(updateQuizEdit({ ...editQuiz, category: '' }))
        setNewCategoryToggle(false);
    }

    function addQuestion(type: string) {
        setEditQuestion(false)
        dispatch(updateQuizEdit({
            ...editQuiz,
            questions: [...editQuiz.questions, {
                id: editQuiz.questions.length,
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
        for (let i = 0; i < editQuiz.questions.length; i++) {
            if (editQuiz.questions[i].type === 'checkbox') {
                if (!editQuiz.questions[i].answers.length) {
                    console.log(`Error: No answer selected on question #${i + 1}`)
                    return;
                }
            }
        }
        
        if (newCategory) {
            categoryServices.createCategory({ title: newCategory }).then(async (category: Category) => {
                if (category.id) {
                    let cache = { ...editQuiz, category: category.id };
                    try {
                        await quizServices.updateQuiz(id, cache).then((quiz: Quiz) => {
                            navigate(`/quiz/${quiz.id}`)
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
                await quizServices.updateQuiz(id, editQuiz).then((quiz: Quiz) => {
                    navigate(`/quiz/${quiz.id}`)
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
        dispatch(loadQuiz(id));
    }, [])

    useEffect(()=>{
        if(editQuiz.id){
            const fetchedUser: User | null = localStorageTools.getUser();
            setUser(fetchedUser);

            if (!fetchedUser) {
                navigate('/auth');
            } else if (fetchedUser.id !== editQuiz.author) {
                navigate(`/quiz/${editQuiz.id}`);
            } else {
                setUser(fetchedUser);
                handleRequest();
            };
        }
    },[editQuiz])

    if (!user || !categories?.length) {
        return <p>Loading...</p>
    }

    return (
        <div className='QuizEdit'>
            <h2>Edit Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-header'>
                    <input name='title' value={editQuiz.title} placeholder='Enter Title' onChange={handleChange} />
                    {!newCategoryToggle ?
                        <select name='category' defaultValue={editQuiz.category} onChange={handleCategory} required>
                            <option disabled value=''>Choose a Category</option>
                            {categories.map((category: Category) => {
                                return <option key={category.id} value={category.id}>{category.title}</option>
                            })}
                            <option value='form'>(New Category)</option>
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
                    {editQuiz.questions?.map((question: Question, idx) => {
                        return (<>
                            <EditQuestion key={idx} question={question} />
                            <hr />
                        </>)
                    })}
                    <div>
                        {!editQuestion ?
                            <button onClick={(e) => setEditQuestion(true)}>+ Add a Question</button>
                            :
                            <div className='form-question-options'>
                                <button onClick={(e) => addQuestion('text')}>Short Answer</button>
                                <button onClick={(e) => addQuestion('radio')}>Multiple Choice</button>
                                <button onClick={(e) => addQuestion('checkbox')}>Select All</button>
                                <button onClick={(e) => setEditQuestion(false)}>X</button>
                            </div>
                        }
                        {editQuiz.questions.length ?
                            <input type='submit' value='Save' />
                            :
                            null}
                    </div>
                </div>
            </form>
        </div>
    );
}