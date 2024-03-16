import './NewQuestion.css';

import React from 'react';
import { Quiz, Question } from '../../utilities/types';
import { updateQuizNew, selectNewQuiz } from '../../pages/QuizNew/quizNewSlice';
import { useDispatch, useSelector } from 'react-redux';

import NewText from '../../components/NewText/NewText';
import NewRadio from '../../components/NewRadio/NewRadio';
import NewCheckbox from '../../components/NewCheckbox/NewCheckbox';

export default function NewQuestion({ question }: { question: Question }) {

    const newQuiz: Quiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    function handleDelete(e: React.FormEvent<HTMLButtonElement>){
        const questionsCache = [...newQuiz.questions]
        const idx = questionsCache.findIndex((q)=>q.id === question.id);
        if (idx > -1){
            questionsCache.splice(idx,1);
            for (let i: number = 0; i < questionsCache.length; i++){
                questionsCache[i] = {...questionsCache[i], id: i};
            }
            dispatch(updateQuizNew({...newQuiz, questions: [...questionsCache]}))
        } else {
            console.log('Error: Question not found.');
        };
    };

    function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
        let cache: Question = newQuiz.questions[question.id];
        cache = { ...cache, query: e.target.value }
        const questionArr: Array<Question> = [...newQuiz.questions]
        questionArr[question.id] = cache;
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }))
    }

    return (
        <div className='NewQuestion'>
            <h3>Question #{question.id + 1} <button onClick={handleDelete}>X</button></h3>
            <input name='query' placeholder='Type a question' onChange={handleChangeQuery} required />
            {question.type === 'text' ?
                <NewText question={question} />
                : question.type === 'radio' ?
                    <NewRadio question={question} />
                    :
                    <NewCheckbox question={question} />
            }
        </div>
    );
}