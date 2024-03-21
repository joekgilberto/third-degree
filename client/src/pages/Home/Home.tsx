import './Home.css';

import React, { useEffect, useState } from 'react';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { useDispatch } from 'react-redux';
import { Quiz } from '../../utilities/types';
import { setCurrentPage } from '../../components/Header/navSlice';

import QuizCard from '../../components/QuizCard/QuizCard';
import { Link } from 'react-router-dom';

export default function Home() {

  const dispatch = useDispatch();
  const [hardestQuizzes, setHardestQuizzes] = useState<Array<Quiz>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function handleRequest(): Promise<void> {
    await quizServices.getHardestQuizzes().then((quizzes) => {
      setHardestQuizzes(quizzes);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    dispatch(setCurrentPage('home'))
    handleRequest();
  }, [])

  return (
    <div className='Home'>
      <h2>A challenger approaches!</h2>
      <p>Welcome to <span className='special bold'>Third Degree</span>, the quiz center of the known universe!<br />Here at Third Degree, we believe in the power of knowledge and the joy of learning. Whether you're here to challenge your intellect or to craft thought-provoking quizzes, you've found the perfect digital institution.<br />Let your quest for the Third Degree begin!</p>
      <h3>Our Hardest Quizzes:</h3>
      <hr />
      {isLoading ?
        <p>Loading...</p>
        :
        hardestQuizzes.length ?
          hardestQuizzes.map((quiz: Quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} />;
          })
          :
          <p>No quizzes yet- start building!</p>}
    </div>
  );
}