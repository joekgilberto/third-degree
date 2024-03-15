import './NewCheckbox.css';

import React from 'react';

import { Question } from '../../utilities/types';

export default function NewCheckbox({question}:{question: Question}) {
    return (
        <div className='NewCheckbox'>
            <input placeholder='Type a question' />
        </div>
    );
}