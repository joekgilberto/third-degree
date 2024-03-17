import './QuizNew.css';

import React, { useEffect, useState } from 'react';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as categoryServices from '../../utilities/category/category-services';
import { selectNewQuiz, updateQuizNew } from './quizNewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Category, Question } from '../../utilities/types';

import NewQuestion from '../../components/NewQuestion/NewQuestion';

export default function QuizNew() {

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

    const [newCategoryToggle, setNewCategoryToggle] = useState<boolean>(false);
    const [newCategory, setNewCategory] = useState<string>();
    const [newQuestion, setNewQuestion] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<Category>>([]);

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

    function handleNewCategory(e: React.ChangeEvent<HTMLInputElement>){
        setNewCategory(e.target.value);
    }

    function handleExitCategory() {
        dispatch(updateQuizNew({ ...newQuiz, category: '' }))
        setNewCategoryToggle(false);
    }

    function addQuestion(type: string) {
        setNewQuestion(false)
        if (type === 'text') {
            dispatch(updateQuizNew({
                ...newQuiz,
                questions: [...newQuiz.questions, {
                    ...initTextQuestion,
                    id: newQuiz.questions.length,
                    type: type
                }]
            }));
        } else if (type === 'radio') {
            dispatch(updateQuizNew({
                ...newQuiz,
                questions: [...newQuiz.questions, {
                    ...initRadioQuestion,
                    id: newQuiz.questions.length,
                    type: type
                }]
            }));
        } else if (type === 'checkbox') {
            dispatch(updateQuizNew({
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
                if(!newQuiz.questions[i].answers?.length){
                    console.log(`Error: No answer selected on question #${i+1}`)
                    return;
                }
            }
        }

        console.log(newQuiz);
        
        if(newCategory){
            categoryServices.createCategory({title: newCategory}).then((category: Category)=>{
                if(category.id){
                    let cache = {...newQuiz, category: category.id};
                    try {
                        quizServices.createQuiz(cache);
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
                quizServices.createQuiz(newQuiz);
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function handleRequest(){
        await categoryServices.getAllCategories().then((categories: Array<Category>)=>{
            console.log(categories)
            setCategories(categories)
        })
    }

    useEffect(()=>{
        handleRequest();
    },[])

    if(!categories.length){
        return <p>Loading...</p>
    }

    return (
        <div className='QuizNew'>
            <h2>New Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className='new-header'>
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