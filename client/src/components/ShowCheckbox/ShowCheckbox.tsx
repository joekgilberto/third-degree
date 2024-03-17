import './ShowCheckbox.css';

import React from 'react';
import { updateSubmissionNew, selectSubmission } from '../../pages/QuizShow/quizShowSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Answer, Question, Submission } from '../../utilities/types';

export default function ShowCheckbox({ question }: { question: Question }) {

    const newSubmission: Submission = useSelector(selectSubmission);
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const answerArr: Array<Answer> = [...newSubmission.answers]
        console.log(newSubmission.answers[question.id].guesses.includes(e.target.value))
        if(newSubmission.answers[question.id].guesses.includes(e.target.value)){
            const idx: number | undefined = answerArr[question.id].guesses.indexOf(e.target.value);
            const guessesArr = [...answerArr[question.id].guesses];
            guessesArr.splice(idx,1);
            answerArr[question.id] = { ...answerArr[question.id], guesses:[...guessesArr] };
        } else {
            answerArr[question.id] = { ...answerArr[question.id], guesses:[...answerArr[question.id].guesses, e.target.value] }
        }

        dispatch(updateSubmissionNew({ ...newSubmission, answers: [...answerArr] }))
    }

    return (
        <div className='ShowCheckbox'>
            <label>
                <input type='checkbox' name='a' value='a' checked={newSubmission.answers[question.id].guesses.includes('a')} onChange={handleChange} />
                A&#41; {question.choices?.a}
            </label>

            <label>
                <input type='checkbox' name='b' value='b' checked={newSubmission.answers[question.id].guesses.includes('b')} onChange={handleChange} />
                B&#41; {question.choices?.b}
            </label>

            {question.choices?.c ?
                <label>
                    <input type='checkbox' name='c' value='c' checked={newSubmission.answers[question.id].guesses.includes('c')} onChange={handleChange} />
                    C&#41; {question.choices?.c}
                </label>
                : null}

            {question.choices?.d ?
                <label>
                    <input type='checkbox' name='d' value='d' checked={newSubmission.answers[question.id].guesses.includes('d')} onChange={handleChange} />
                    D&#41; {question.choices?.d}
                </label>
                : null}
        </div>
    );
}