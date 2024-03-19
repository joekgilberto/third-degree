import './SubmissionRadio.css';

import React from 'react';
import { Question } from '../../utilities/types';

export default function SubmissionRadio({ question, guess }: { question: Question, guess: string }) {

    function handleCorrection(value: string): string {
        if (question.answer === value) {
            return 'correct';
        } else if (guess === value) {
            return 'incorrect';
        }
        return '';
    };

    return (
        <div className='SubmissionRadio'>
            <div className={handleCorrection('a')}>
                <p>A&#41; {question.choices.a}</p>
                {guess === 'a' ? <p>Your guess</p> : null}
            </div>

            <div className={handleCorrection('b')}>
                <p>B&#41; {question.choices.b}</p>
                {guess === 'b' ? <p>Your guess</p> : null}
            </div>

            {question.choices.c ?
                <div className={handleCorrection('c')}>
                    <p>C&#41; {question.choices.c}</p>
                    {guess === 'c' ? <p>Your guess</p> : null}
                </div>
                : null
            }

            {question.choices.d ?
                <div className={handleCorrection('d')}>
                    <p>D&#41; {question.choices.d}</p>
                    {guess === 'd' ? <p>Your guess</p> : null}
                </div >
                : null
            }
        </div >
    );
};