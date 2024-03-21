import './ShowText.css';

import React, { useEffect, useState } from 'react';
import { selectSubmission, updateSubmissionNew } from '../../pages/QuizShow/quizShowSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Question, Submission, Answer } from '../../utilities/types';

export default function ShowText({ question }: { question: Question }) {

    const dispatch = useDispatch();
    const newSubmission: Submission = useSelector(selectSubmission);

    const [length, setLength] = useState<number>();

    useEffect(() => {
        const answerArr: Array<string> = question.answer.split(' ');
        const answerLength: number = answerArr.length;
        setLength(answerLength);
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const answerArr: Array<Answer> = [...newSubmission.answers];
        answerArr[question.id] = { ...answerArr[question.id], guess: e.target.value.toLowerCase() };
        const submissionCache: Submission = { ...newSubmission, answers: [...answerArr] };
        dispatch(updateSubmissionNew(submissionCache));
    };

    return (
        <div className='ShowText'>
            <p>&#40;{length} {length === 1 ? 'word' : 'words'} long&#41;</p>
            <input name='guess' placeholder='Make a guess' onChange={handleChange} required />
        </div>
    );
};