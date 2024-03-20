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
        <div className='EditText'>
            <h3>Answer #{question.id + 1}</h3>
            <input name='answer' value={editQuiz.questions[question.id].answer} placeholder='Type an answer' onChange={handleChange} required />
            <p>*Third Degree recommends keeping short answer questions as concise as possible for challenger benefit.</p>
        </div>
    );
};