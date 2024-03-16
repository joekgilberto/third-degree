import './Home.css';

import React, { useEffect, useState } from 'react';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz } from '../../utilities/types';

import QuizCard from '../../components/QuizCard/QuizCard';
import { Link } from 'react-router-dom';

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
    category: 'a'
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
    category: 'b'
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
    category: 'c'
  }
]

export default function Home() {

  const [hardestQuizzes, setHardestQuizzes] = useState<Array<Quiz>>([]);

  async function handleRequest() {
    await quizServices.getHardestQuizzes().then((quizzes) => {
      setHardestQuizzes(quizzes);
    });
  };

  useEffect(() => {
    handleRequest();
  }, [])

  if (!hardestQuizzes.length) {
    return <p>Loading...</p>
  }

  return (
    <div className='Home'>
      <h2>A challenger approaches!</h2>
      <p>Welcome to <span className='bold'>Third Degree</span>, the quiz center of the known universe!<br />Here at Third Degree, we believe in the power of knowledge and the joy of learning. Whether you're here to challenge your intellect or to craft thought-provoking quizzes, you've found the perfect digital institution.<br />Let your quest for the Third Degree begin!</p>
      <h3>Our Hardest Quizzes:</h3>
      <hr />
      {hardestQuizzes.map((quiz: Quiz) => {
        return (
          <Link to={`/quiz/${quiz.id}`}>
            <QuizCard key={quiz.id} quiz={quiz} />
          </Link>
        )
      })}
    </div>
  );
}