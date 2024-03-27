import './ShowCheckbox.css';

import React from 'react';
import { selectSubmission, updateSubmissionNew } from '../../pages/QuizShow/quizShowSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Question, Submission, Answer } from '../../utilities/types';

export default function ShowCheckbox({ question }: { question: Question }) {

    const newSubmission: Submission = useSelector(selectSubmission);
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const answerArr: Array<Answer> = [...newSubmission.answers];

        if(newSubmission.answers[question.id].guesses.includes(e.target.value)){
            const idx: number = answerArr[question.id].guesses.indexOf(e.target.value);
            const guessesArr: Array<string> = [...answerArr[question.id].guesses];
            guessesArr.splice(idx,1);
            answerArr[question.id] = { ...answerArr[question.id], guesses:[...guessesArr] };
        } else {
            answerArr[question.id] = { ...answerArr[question.id], guesses:[...answerArr[question.id].guesses, e.target.value] };
        };

        dispatch(updateSubmissionNew({ ...newSubmission, answers: [...answerArr] }));
    };

    return (
        <div className='ShowCheckbox'>
            <p>&#40;select all that apply&#41;</p>
            <label>
                <input type='checkbox' name='a' value='a' checked={newSubmission.answers[question.id].guesses.includes('a')} onChange={handleChange} />
                <p>A&#41; {question.choices.a}</p>
            </label>

            <label>
                <input type='checkbox' name='b' value='b' checked={newSubmission.answers[question.id].guesses.includes('b')} onChange={handleChange} />
                <p>B&#41; {question.choices.b}</p>
            </label>

            {question.choices.c ?
                <label>
                    <input type='checkbox' name='c' value='c' checked={newSubmission.answers[question.id].guesses.includes('c')} onChange={handleChange} />
                    <p>C&#41; {question.choices.c}</p>
                </label>
                : null}

            {question.choices.d ?
                <label>
                    <input type='checkbox' name='d' value='d' checked={newSubmission.answers[question.id].guesses.includes('d')} onChange={handleChange} />
                    <p>D&#41; {question.choices.d}</p>
                </label>
                : null}
        </div>
    );
};