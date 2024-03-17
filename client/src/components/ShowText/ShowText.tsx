import './ShowText.css';

import React, { useEffect, useState } from 'react';
import { updateSubmissionNew, selectSubmission} from '../../pages/QuizShow/quizShowSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Answer, Question, Submission } from '../../utilities/types';

export default function ShowText({question}:{question: Question}) {

    const newSubmission: Submission = useSelector(selectSubmission);
    const dispatch = useDispatch();

    const [length, setLength] = useState<number>();

    useEffect(()=>{
        if(question.answer){
            const answerArr = question.answer.split(' ');
            const answerLength = answerArr.length;
            setLength(answerLength);
        }
    },[])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const answerArr: Array<Answer> = [...newSubmission.answers]
        answerArr[question.id] = {...answerArr[question.id], guess: e.target.value.toLowerCase()}
        dispatch(updateSubmissionNew({...newSubmission, answers: [...answerArr]}))
    }

    return (
        <div className='ShowText'>
            <p>&#40;{length} {length === 1?'word':'words'} long&#41;</p>
            <input name='guess' placeholder='Make a guess' onChange={handleChange} required />
        </div>
    );
}