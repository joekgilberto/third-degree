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
    const initState: Quiz = {
        title: '',
        questions: [],
        submissions: [],
        postingDate: new Date(),
        username: 'joekgilberto',
        author: '65ee2084f86b1b2bc8530705',
        category: ''
    }

    const [formData, setFormData] = useState<Quiz>(initState)
    const [newCategory, setNewCategory] = useState<boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === 'new') {
            setNewCategory(true);
            setFormData({...formData, category: initState.category})
        } else {
            setFormData({...formData, category: e.target.value})
        };
    };

    function handleExitCategory(){
        setFormData({...formData, category: initState.category})
        setNewCategory(false);
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
            {newCategory?
            <div className='new-note'>
                <p>*Please create a new category at your own discretion.  We here at Third Degree recommend keeping category names concise and relevant.  Admins reserve the right to edit, merge, or delete any new categories.</p>
            </div>
            :null}
            {formData.questions.map((question: Question)=>{
                return <NewQuestion key={question.id} question={question} />
            })}
        </div>
    );
}