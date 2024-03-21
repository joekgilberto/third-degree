import './QuizCard.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from '../../utilities/types';

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className='QuizCard'>
      <Link to={`/quiz/${quiz.id}`}>
        <h3 className='underline'>{quiz.title}</h3>
        {quiz.avgScore ?
          <p>{quiz.avgScore.toFixed(2)}% average score</p>
          :
          <p>No challengers yet</p>}
      </Link>
    </div>
  );
};