import './NewQuestion.css';

import React from 'react';
import { Question } from '../../utilities/types';

import NewText from '../../components/NewText/NewText';
import NewRadio from '../../components/NewRadio/NewRadio';
import NewCheckbox from '../../components/NewCheckbox/NewCheckbox';

export default function NewQuestion({question}:{question: Question}) {
  return (
    <div className='NewQuestion'>
        <h3>Question #{question.id+1} <button>X</button></h3>
        {question.type==='text'?
        <NewText />
        : question.type ==='radio'?
        <NewRadio />
        :
        <NewCheckbox />
        }
    </div>
  );
}