import './Home.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../components/Header/navSlice';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz } from '../../utilities/types';

import QuizCard from '../../components/QuizCard/QuizCard';
import Loading from '../../components/Loading/Loading';

export default function Home() {

  const dispatch = useDispatch();
  const [hardestQuizzes, setHardestQuizzes] = useState<Array<Quiz>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleRequest(): Promise<void> {
    await quizServices.getHardestQuizzes().then((quizzes) => {
      setHardestQuizzes(quizzes);
      setLoading(false);
    });
  };

  useEffect(() => {
    dispatch(setCurrentPage('home'));
    handleRequest();
  }, []);

  return (
    <div className='Home'>
      <h2>A challenger approaches!</h2>
      <p>Welcome to <span className='special bold'>Third Degree</span>, the quiz center of the known universe!</p>
      <p>Here, we believe in the power of knowledge and the joy of learning. Whether you're here to challenge your intellect or to craft thought-provoking quizzes, you've found the perfect digital institution.</p>
      <p>Let your quest for the <span className='special bold'>Third Degree</span> begin!</p>
      <div className='hardest'>
      <h3>Our Hardest Quizzes:</h3>
      {loading ?
        <Loading />
        :
        hardestQuizzes.length ?
          hardestQuizzes.map((quiz: Quiz) => {
            return <QuizCard key={quiz.id} quiz={quiz} />;
          })
          :
          <p>No quizzes yet- start building!</p>}
    </div>
    </div>
  );
};