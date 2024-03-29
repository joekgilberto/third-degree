import './Home.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz } from '../../utilities/types';

import Banner from '../../components/Banner/Banner';
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
    dispatch(updateCurrentPage('home'));
    handleRequest();
  }, []);

  return (
    <div className='Home'>
      <Banner source='https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' altText='brown pencil on equation paper' sub='A challenger approaches!' link='https://unsplash.com/@chrisliverani' credit='Chris Liverani' />
      <div className='intro'>
        <p>Welcome to <span className='cursive bold'>Third Degree</span>, the quiz center of the known universe!</p>
        <p>Here, we believe in the power of knowledge and the joy of learning. Whether you're here to challenge your intellect or to craft thought-provoking quizzes, you've found the perfect digital institution.</p>
        <p>Let your quest for the <span className='cursive bold'>Third Degree</span> begin!</p>
      </div>
      <div className='hardest'>
        <h3>Our Hardest Quizzes:</h3>
        {loading ?
          <Loading />
          :
          hardestQuizzes.length ?
            <div className='list'>
              {hardestQuizzes.map((quiz: Quiz, idx: number) => {
                return <QuizCard key={quiz.id} quiz={quiz} timing={idx} />;
              })}
            </div>
            :
            <p>No quizzes, yet! Start building!</p>}
      </div>
    </div>
  );
};