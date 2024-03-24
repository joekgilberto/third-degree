import './CategoryShow.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Category } from '../../utilities/types';

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
      <h2>{category.title} Category</h2>
      <p>Find a <span className='cursive bold'>quiz</span>:</p>
      <hr />
      {quizzes.map((quiz: Quiz, idx: number) => {
        return (
          <QuizCard key={quiz.id} quiz={quiz} timing={idx} />
        )
      })}
    </div>
  );
}