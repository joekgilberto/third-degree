import './ShowRadio.css';

import React from 'react';
import { selectSubmission, updateSubmissionNew } from '../../pages/QuizShow/quizShowSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Question, Submission, Answer } from '../../utilities/types';

export default function ShowRadio({ question }: { question: Question }) {

    const newSubmission: Submission = useSelector(selectSubmission);
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const answerArr: Array<Answer> = [...newSubmission.answers];
        answerArr[question.id] = { ...answerArr[question.id], guess: e.target.value };
        const submissionCache: Submission = { ...newSubmission, answers: [...answerArr] };
        dispatch(updateSubmissionNew(submissionCache));
    };

    return (
        <div className='ShowRadio'>
            <label>
                <input type='radio' name='a' value='a' checked={newSubmission.answers[question.id].guess==='a'} onChange={handleChange} />
                A&#41; {question.choices.a}
            </label>

            <label>
                <input type='radio' name='b' value='b' checked={newSubmission.answers[question.id].guess==='b'} onChange={handleChange} />
                B&#41; {question.choices.b}
            </label>

            {question.choices.c ?
                <label>
                    <input type='radio' name='c' value='c' checked={newSubmission.answers[question.id].guess==='c'} onChange={handleChange} />
                    C&#41; {question.choices.c}
                </label>
                : null}

            {question.choices.d ?
                <label>
                    <input type='radio' name='d' value='d' checked={newSubmission.answers[question.id].guess==='d'} onChange={handleChange} />
                    D&#41; {question.choices.d}
                </label>
                : null}
        </div>
    );
};