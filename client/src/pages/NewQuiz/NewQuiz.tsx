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

    const initTextQuestion: Question = {
        id: 0,
        type: '',
        query: '',
        answer: ''
    }

    const initRadioQuestion: Question = {
        id: 0,
        type: '',
        query: '',
        choices: {
            a: '',
            b: ''
        },
        answer: ''
    }

    const initCheckboxQuestion: Question = {
        id: 0,
        type: '',
        query: '',
        choices: {
            a: '',
            b: ''
        },
        answers: []
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
        } else if (type === 'radio') {
            dispatch(updateNewQuiz({
                ...newQuiz,
                questions: [...newQuiz.questions, {
                    ...initRadioQuestion,
                    id: newQuiz.questions.length,
                    type: type
                }]
            }));
        } else if (type === 'checkbox') {
            dispatch(updateNewQuiz({
                ...newQuiz,
                questions: [...newQuiz.questions, {
                    ...initCheckboxQuestion,
                    id: newQuiz.questions.length,
                    type: type
                }]
            }));
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        for(let i = 0; i < newQuiz.questions.length; i++){
            if (newQuiz.questions[i].type === 'checkbox'){
                if(!newQuiz.questions[i].answers.length){
                    console.log(`Error: No answer selected on question #${i+1}`)
                    return;
                }
            }
        }
        console.log(newQuiz);
    }

    return (
        <div className='NewQuiz'>
            <h2>New Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className='new-header'>
                    <input name='title' placeholder='Enter Title' onChange={handleChange} />
                    {!newCategory ?
                        <select name='category' defaultValue={''} onChange={handleCategory} required>
                            <option disabled value=''>Choose a Category</option>
                            {dummyDataCategories.map((category: Category) => {
                                return <option key={category.id} value={category.title}>{category.title}</option>
                            })}
                            <option value='new'>(New Category)</option>
                        </select>
                        :
                        <>
                            <input name='category' placeholder='Enter new category' onChange={handleChange} required />
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
                            <button onClick={(e) => setNewQuestion(true)}>+ Add a Question</button>
                            :
                            <div className='new-question-options'>
                                <button onClick={(e) => addQuestion('text')}>Short Answer</button>
                                <button onClick={(e) => addQuestion('radio')}>Multiple Choice</button>
                                <button onClick={(e) => addQuestion('checkbox')}>Select All</button>
                                <button onClick={(e) => setNewQuestion(false)}>X</button>
                            </div>
                        }
                        {newQuiz.questions.length?
                        <button>Submit</button>:
                        null}
                    </div>
                </div>
            </form>
        </div>
    );
}