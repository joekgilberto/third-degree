import './NewQuestion.css';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNewQuiz, updateQuizNew } from '../../pages/QuizNew/quizNewSlice';
import { Quiz, Question } from '../../utilities/types';

import NewText from '../../components/NewText/NewText';
import NewRadio from '../../components/NewRadio/NewRadio';
import NewCheckbox from '../../components/NewCheckbox/NewCheckbox';

export default function NewQuestion({ question }: { question: Question }) {

    const newQuiz: Quiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    function handleDelete(e: React.FormEvent<HTMLButtonElement>): void {
        const questionsCache: Array<Question> = [...newQuiz.questions]
        const idx: number = questionsCache.findIndex((q) => q.id === question.id);
        if (idx > -1) {
            questionsCache.splice(idx, 1);
            for (let i: number = 0; i < questionsCache.length; i++) {
                questionsCache[i] = { ...questionsCache[i], id: i };
            }
            dispatch(updateQuizNew({ ...newQuiz, questions: [...questionsCache] }));
        } else {
            console.log('Error: Question not found.');
        };
    };

    function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Question = newQuiz.questions[question.id];
        cache = { ...cache, query: e.target.value };

        const questionArr: Array<Question> = [...newQuiz.questions];
        questionArr[question.id] = cache;
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    return (
        <div className='FormQuestion'>
            <div className='number'>
                <h3>Question #{question.id + 1}</h3>
                <button className='delete' onClick={handleDelete}>X</button>
            </div>
            <label className='question'>
                <p>Question:</p>
                <input name='query' placeholder='Type a question' onChange={handleChangeQuery} required />
            </label>
            {question.type === 'text' ?
                <NewText question={question} />
                : question.type === 'radio' ?
                    <NewRadio question={question} />
                    :
                    <NewCheckbox question={question} />
            }
        </div>
    );
};