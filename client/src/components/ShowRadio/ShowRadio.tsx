import './ShowRadio.css';

import React from 'react';
import { updateSubmissionNew, selectSubmission } from '../../pages/QuizShow/quizShowSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Answer, Question, Submission } from '../../utilities/types';

export default function ShowRadio({ question }: { question: Question }) {

    const newSubmission: Submission = useSelector(selectSubmission);
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const answerArr: Array<Answer> = [...newSubmission.answers]
        answerArr[question.id] = { ...answerArr[question.id], guess: e.target.value }
        dispatch(updateSubmissionNew({ ...newSubmission, answers: [...answerArr] }))
    }

    return (
        <div className='ShowRadio'>
            <label>
                <input type='radio' name='a' value='a' checked={newSubmission.answers[question.id].guess==='a'} onChange={handleChange} />
                A&#41; {question.choices?.a}
            </label>

            <label>
                <input type='radio' name='b' value='b' checked={newSubmission.answers[question.id].guess==='b'} onChange={handleChange} />
                B&#41; {question.choices?.b}
            </label>

            {question.choices?.c ?
                <label>
                    <input type='radio' name='c' value='c' checked={newSubmission.answers[question.id].guess==='c'} onChange={handleChange} />
                    C&#41; {question.choices?.c}
                </label>
                : null}

            {question.choices?.d ?
                <label>
                    <input type='radio' name='d' value='d' checked={newSubmission.answers[question.id].guess==='d'} onChange={handleChange} />
                    D&#41; {question.choices?.d}
                </label>
                : null}
        </div>
    );
}