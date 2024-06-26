import './ShowQuestion.css';

import React from 'react';
import { Question } from '../../utilities/types';

import ShowText from '../../components/ShowText/ShowText';
import ShowRadio from '../../components/ShowRadio/ShowRadio';
import ShowCheckbox from '../../components/ShowCheckbox/ShowCheckbox';

export default function ShowQuestion({ question }: { question: Question }) {

    return (
        <div className='ShowQuestion'>
            <h4 className='mono'>Question #{question.id + 1}</h4>
            <label>
                <p>{question.query}</p>
            {question.type === 'text' ?
                <ShowText question={question} />
                : question.type === 'radio' ?
                    <ShowRadio question={question} />
                    :
                    <ShowCheckbox question={question} />
            }
            </label>
        </div>
    );
};