import './NewRadio.css';

import React from 'react';

import { Question } from '../../utilities/types';

export default function NewRadio({question}:{question: Question}) {
    return (
        <div className='NewRadio'>
            <input placeholder='Type a question' />
        </div>
    );
}