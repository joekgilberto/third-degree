import './Home.css';

import React from 'react';
import { Quiz } from '../../utilities/types';

import QuizCard from '../../components/QuizCard/QuizCard';

const dummyData: Array<Quiz> = [
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
    category: 'Superheroes'
  },
  {
    id: 'b',
    title: 'Chemistry Facts',
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
    category: 'Science'
  },
  {
    id: 'c',
    title: 'Movie History',
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
    category: 'Film & TV'
  }
]

export default function Home() {
  return (
    <div className="Home">
      <h2>A challenger approaches!</h2>
      <p>Welcome to <span className='bold'>Third Degree</span>, the quiz center of the known universe!<br />Here at Third Degree, we believe in the power of knowledge and the joy of learning. Whether you're here to challenge your intellect or to craft thought-provoking quizzes, you've found the perfect digital institution.<br />Let your quest for the Third Degree begin!</p>
      <h3>Our Hardest Quizzes:</h3>
      <hr />
      {dummyData.map((quiz: Quiz)=>{
        return <QuizCard key={quiz.id} quiz={quiz} />
      })}
    </div>
  );
}