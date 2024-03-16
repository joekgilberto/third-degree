import './NewQuiz.css';

import React, { useEffect, useState } from 'react';
import { selectNewQuiz, updateNewQuiz } from './newQuizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Category, Question } from '../../utilities/types';

import NewQuestion from '../../components/NewQuestion/NewQuestion';

const dummyDataCategories: Array<Category> = [
    {
        id: 'a',
        title: 'Alt Rock'
    },
    {
        id: 'b',
        title: 'History'
    },
    {
        id: 'c',
        title: 'Film & TV'
    },
    {
        id: 'd',
        title: 'Science'
    },
]

export default function NewQuiz() {

    const newQuiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(newQuiz)
    }, [newQuiz])

    const initTextQuestion: Question = {
        id: 0,
        type: '',
        query: '',
        answer: ''
    }
    const initChoiceQuestion: Question = {
        id: 0,
        type: '',
        query: '',
        choices: {
            a: '',
            b: ''
        },
        answer: ''
    }

    const [newCategory, setNewCategory] = useState<boolean>(false);
    const [newQuestion, setNewQuestion] = useState<boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(updateNewQuiz({ ...newQuiz, [e.target.name]: e.target.value }))
    }

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === 'new') {
            setNewCategory(true);
            dispatch(updateNewQuiz({ ...newQuiz, category: '' }))
        } else {
            dispatch(updateNewQuiz({ ...newQuiz, category: e.target.value }))
        };
    };

    function handleExitCategory() {
        dispatch(updateNewQuiz({ ...newQuiz, category: '' }))
        setNewCategory(false);
    }

    function addQuestion(type: string) {
        setNewQuestion(false)
        if (type === 'text') {
            dispatch(updateNewQuiz({
                ...newQuiz,
                questions: [...newQuiz.questions, {
                    ...initTextQuestion,
                    id: newQuiz.questions.length,
                    type: type
                }]
            }));
        } else if (type === 'radio' || type === 'checkbox') {
            dispatch(updateNewQuiz({
                ...newQuiz,
                questions: [...newQuiz.questions, {
                    ...initChoiceQuestion,
                    id: newQuiz.questions.length,
                    type: type
                }]
            }));
        }
    }

    return (
        <div className='NewQuiz'>
            <h2>New Quiz</h2>
            <div className='new-header'>
                <input name='title' placeholder='Enter Title' onChange={handleChange} />
                {!newCategory ?
                    <select name='category' defaultValue={''} onChange={handleCategory}>
                        <option disabled value=''>Choose a Category</option>
                        {dummyDataCategories.map((category: Category) => {
                            return <option key={category.id} value={category.title}>{category.title}</option>
                        })}
                        <option value='new'>(New Category)</option>
                    </select>
                    :
                    <>
                        <input name='category' placeholder='Enter new category' onChange={handleChange} />
                        <button onClick={handleExitCategory}>X</button>
                    </>
                }
            </div>
            {newCategory ?
                <div className='new-note'>
                    <p>*Please create a new category at your own discretion.  We here at Third Degree recommend keeping category names concise and relevant.  Admins reserve the right to edit, merge, or delete any new categories.</p>
                </div>
                : null}
            <div>
                {newQuiz.questions?.map((question: Question) => {
                    return (<>
                    <NewQuestion key={question.id} question={question} />
                    <hr />
                    </>)
                })}
                <div>
                    {!newQuestion ?
                        <p onClick={(e) => setNewQuestion(true)}>+ Add a Question</p>
                        :
                        <div className='new-question-options'>
                            <button onClick={(e) => addQuestion('text')}>Short Answer</button>
                            <button onClick={(e) => addQuestion('radio')}>Multiple Choice</button>
                            <button onClick={(e) => addQuestion('checkbox')}>Select All</button>
                            <button onClick={(e) => setNewQuestion(false)}>X</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}