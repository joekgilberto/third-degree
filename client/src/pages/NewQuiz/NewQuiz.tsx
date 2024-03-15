import './NewQuiz.css';

import React, { useState } from 'react';
import { Quiz, Category, Question } from '../../utilities/types';

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

    //TODO: make username and author specific to logged in user
    const initQuiz: Quiz = {
        title: '',
        questions: [],
        submissions: [],
        postingDate: new Date(),
        username: 'joekgilberto',
        author: '65ee2084f86b1b2bc8530705',
        category: ''
    }
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
        choices: {},
        answer: ''
    }

    const [formData, setFormData] = useState<Quiz>(initQuiz)
    const [newCategory, setNewCategory] = useState<boolean>(false);
    const [newQuestion, setNewQuestion] = useState<boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === 'new') {
            setNewCategory(true);
            setFormData({ ...formData, category: initQuiz.category })
        } else {
            setFormData({ ...formData, category: e.target.value })
        };
    };

    function handleExitCategory() {
        setFormData({ ...formData, category: initQuiz.category })
        setNewCategory(false);
    }

    function addQuestion(type: string) {
        setNewQuestion(false)
        if (type === 'text') {
            setFormData({
                ...formData,
                questions: [...formData.questions, {
                    ...initTextQuestion,
                    id: formData.questions.length,
                    type: type
                }]
            });
        } else if (type === 'radio' || type === 'checkbox') {
            setFormData({
                ...formData,
                questions: [...formData.questions, {
                    ...initChoiceQuestion,
                    id: formData.questions.length,
                    type: type
                }]
            });
        }
    }

    return (
        <div className='NewQuiz'>
            <h2>New Quiz</h2>
            <div className='new-header'>
                <input placeholder='Enter Title' />
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
                {formData.questions.map((question: Question) => {
                    return <NewQuestion key={question.id} question={question} />
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