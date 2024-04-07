import './NewText.css';

import React from 'react';
import { selectNewQuiz, updateQuizNew } from '../../pages/QuizNew/quizNewSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Quiz, Question } from '../../utilities/types';

export default function NewText({ question }: { question: Question }) {

    const newQuiz: Quiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const questionArr: Array<Question> = [...newQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], [e.target.name]: e.target.value.toLowerCase() };
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    return (
        <div className='FormText'>
            <label>
                <p>Answer:</p>
                <input name='answer' placeholder='Type an answer' onChange={handleChange} required />
            </label>
            <p className='disclaimer'>*Third Degree recommends keeping answers to Short Answer questions as concise as possible for challenger benefit.</p>
        </div>
    );
};