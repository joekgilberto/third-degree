import './NewText.css';

import React from 'react';

export default function NewText() {
    return (
        <div className='NewText'>
            <input placeholder='Type a question' />
            <input placeholder='Type an answer' />
            <p>*Third Degree recommends keeping short answer questions as concise as possible for challenger benefit.</p>
        </div>
    );
}