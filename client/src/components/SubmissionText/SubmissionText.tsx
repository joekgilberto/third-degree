import './SubmissionText.css';

import React from 'react';
import { Question } from '../../utilities/types';

export default function SubmissionText({ question, guess }: { question: Question, guess: string }) {

    function handleCorrection(value: string): string {
        if (question.answer === value) {
            return ' correct';
        } else if (guess === value) {
            return ' incorrect';
        }
        return '';
    };

    return (
        <div className='SubmissionText'>
                <p>Answer: {question.answer}</p>
                <p className={handleCorrection(guess)}>Your guess: {guess}</p>
        </div >
    );
};