import './QuizCard.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from '../../utilities/types';

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className='QuizCard'>
      <Link to={`/quiz/${quiz.id}`}>
        <h3>{quiz.title}</h3>
        <div className='avg'>
          {quiz.avgScore ?
            <>
              <p className='mono'>{quiz.avgScore.toFixed(2)}%</p>
              <p> average score</p>
            </>
            :
            <p>No challengers yet</p>}
        </div>
      </Link>
    </div>
  );
};