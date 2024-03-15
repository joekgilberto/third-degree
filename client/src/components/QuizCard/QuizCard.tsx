import './QuizCard.css';

import React from 'react';
import { Quiz } from '../../utilities/types';

export default function QuizCard({quiz}:{quiz: Quiz}) {
  return (
    <div className="QuizCard">
      <h3>{quiz.title}</h3>
      {quiz.avgScore?
      <p>{quiz.avgScore.toFixed(1)}% average score</p>
      :
      <p>No challengers yet</p>}
    </div>
  );
}