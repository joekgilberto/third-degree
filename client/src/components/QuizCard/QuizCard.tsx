import './QuizCard.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from '../../utilities/types';

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className='QuizCard'>
      <Link to={`/quiz/${quiz.id}`}>
        <div className='title'>
        <h3>{quiz.title}</h3>
        <p>by {quiz.username}</p>
        </div>
        <div className='avg'>
          {quiz.avgScore || quiz.avgScore === 0 ?
            <>
              <p className='mono'>{quiz.avgScore.toFixed(2)}%</p>
              <p> average score</p>
            </>
            :
            <p>No challengers, yet!</p>}
        </div>
      </Link>
    </div>
  );
};