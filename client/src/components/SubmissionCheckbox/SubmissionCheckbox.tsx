import './SubmissionCheckbox.css';

import React from 'react';
import { Question } from '../../utilities/types';

export default function SubmissionCheckbox({ question, guesses }: { question: Question, guesses: Array<string> }) {

    function handleCorrection(value: string): string {
        if (question.answers.includes(value)) {
            return 'correct';
        } else if (guesses.includes(value)) {
            return 'incorrect';
        }
        return '';
    }

    return (
        <div className='SubmissionCheckbox'>
            <div className={handleCorrection('a')}>
                <p>A&#41; {question.choices.a}</p>
                {guesses.includes('a') ? <p>Your guess</p> : null}
            </div>

            <div className={handleCorrection('b')}>
                <p>B&#41; {question.choices.b}</p>
                {guesses.includes('b') ? <p>Your guess</p> : null}
            </div>

            {question.choices.c ?
                <div className={handleCorrection('c')}>
                    <p>C&#41; {question.choices.c}</p>
                    {guesses.includes('c') ? <p>Your guess</p> : null}
                </div>
                : null
            }

            {question.choices.d ?
                <div className={handleCorrection('d')}>
                    <p>D&#41; {question.choices.d}</p>
                    {guesses.includes('d') ? <p>Your guess</p> : null}
                </div >
                : null
            }
        </div>
    );
}