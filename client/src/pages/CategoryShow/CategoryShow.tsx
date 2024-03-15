import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { Quiz } from '../../utilities/types';
import './CategoryShow.css';

import React from 'react';

import QuizCard from '../../components/QuizCard/QuizCard';

const dummyDataCategory = {
    id: '1',
    title: 'Superheroes'
}

const dummyDataQuizzes: Array<Quiz> = [
    {
      id: 'a',
      title: 'Batman Trivia',
      questions: [{
        id: 1,
        type: 'typed',
        query: 'question',
        answer: 'a'
      }],
      submissions: ['1'],
      avgScore: 15.36,
      postingDate: new Date(),
      username: 'joekgilberto',
      author: '1',
      category: 'a'
    },
    {
      id: 'b',
      title: 'Spider-Man Facts',
      questions: [{
        id: 1,
        type: 'typed',
        query: 'question',
        answer: 'a'
      }],
      submissions: ['1'],
      avgScore: 27,
      postingDate: new Date(),
      username: 'joekgilberto',
      author: '1',
      category: 'a'
    },
    {
      id: 'c',
      title: 'Captain Marvel History',
      questions: [{
        id: 1,
        type: 'typed',
        query: 'question',
        answer: 'a'
      }],
      submissions: ['1'],
      avgScore: 31.1,
      postingDate: new Date(),
      username: 'joekgilberto',
      author: '1',
      category: 'a'
    }
  ]

export default function CategoryShow() {
  return (
    <div className='CategoryShow'>
      <h2>{dummyDataCategory.title} Category</h2>
      <p>Find a <span className='bold'>quiz</span>:</p>
      <hr/>
      {dummyDataQuizzes.map((quiz: Quiz)=>{
        return <QuizCard key={quiz.id} quiz={quiz} />
      })}
    </div>
  );
}