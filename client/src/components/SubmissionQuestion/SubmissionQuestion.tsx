import './SubmissionQuestion.css';

import React from 'react';
import { Answer, Question } from '../../utilities/types';
import SubmissionRadio from '../SubmissionRadio/SubmissionRadio';
import SubmissionCheckbox from '../SubmissionCheckbox/SubmissionCheckbox';
import SubmissionText from '../SubmissionText/SubmissionText';

export default function SubmissionQuestion({ question, answer }: { question: Question, answer: Answer }) {
    
    return (
        <div className='SubmissionQuestion'>
            <h3>Question #{question.id + 1}</h3>
            <p>{question.query}</p>
            <h3>Answer:</h3>
            {question.type === 'text' ?
                <SubmissionText question={question} guess={answer.guess} />
                : question.type === 'radio' ?
                    <SubmissionRadio question={question} guess={answer.guess} />
                    :
                    <SubmissionCheckbox question={question} guesses={answer.guesses} />
            }
            <hr />
        </div>
    );
}