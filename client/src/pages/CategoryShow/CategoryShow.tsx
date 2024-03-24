import './CategoryShow.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Category } from '../../utilities/types';

import Banner from '../../components/Banner/Banner';
import QuizCard from '../../components/QuizCard/QuizCard';
import Loading from '../../components/Loading/Loading';

export default function CategoryShow() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState<Category>();
  const [quizzes, setQuizzes] = useState<Array<Quiz>>();

  async function handleRequest(): Promise<void> {
    await categoryServices.getCategory(id).then(async (c) => {
      setCategory(c);
      await quizServices.getQuizByCategory(id).then((q) => {
        setQuizzes(q);
      });
    });
  };

  useEffect(() => {
    dispatch(updateCurrentPage(''));
    handleRequest();
  }, []);

  if (!category || !quizzes) {
    return <Loading />;
  };

  return (
    <div className='CategoryShow'>
      <Banner source={category.image?category.image:'https://images.unsplash.com/photo-1540835296355-c04f7a063cbb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} altText={category.title} sub={`${category.title} Category`} />
      <div className='find'>
        <p>Find a <span className='cursive bold'>quiz</span>:</p>
      </div>
      <div className='list'>
        {quizzes.map((quiz: Quiz, idx: number) => {
          return (
            <QuizCard key={quiz.id} quiz={quiz} timing={idx} />
          )
        })}
      </div>
    </div>
  );
}