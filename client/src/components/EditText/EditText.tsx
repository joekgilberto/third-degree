import './EditText.css';

import React from 'react';
import { selectEditQuiz, updateQuizEdit} from '../../pages/QuizEdit/quizEditSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Quiz, Question } from '../../utilities/types';

export default function EditText({question}:{question: Question}) {

    const editQuiz: Quiz = useSelector(selectEditQuiz);
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        const questionArr: Array<Question> = [...editQuiz.questions];
        questionArr[question.id] = {...questionArr[question.id], [e.target.name]: e.target.value.toLowerCase()};
        dispatch(updateQuizEdit({...editQuiz, questions: [...questionArr]}));
    };

    return (
        <div className='FormText'>
            <label>
                <p>Answer:</p>
                <input name='answer' value={editQuiz.questions[question.id].answer} placeholder='Type an answer' onChange={handleChange} required />
            </label>
            <p className='disclaimer'>*Third Degree recommends keeping answers to Short Answer questions as concise as possible for challenger benefit.</p>
        </div>
    );
};