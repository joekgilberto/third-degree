import './CategoryShow.css';

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../App/appSlice';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as categoryServices from '../../utilities/category/category-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Category, User } from '../../utilities/types';

import Banner from '../../components/Banner/Banner';
import QuizCard from '../../components/QuizCard/QuizCard';
import Loading from '../../components/Loading/Loading';

export default function CategoryShow() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const user: User = useSelector(selectUser);
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
      <Banner source={category.image ? category.image : 'https://images.unsplash.com/photo-1540835296355-c04f7a063cbb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} altText={category.title} sub={category.title} link={category.link ? category.link : 'https://unsplash.com/@olav_ahrens'} credit={category.credit ? category.credit : 'Olav Ahrens Røtne'} />
      <div className='find'>
        <p>Find a <span className='cursive bold'>quiz</span>:</p>
      </div>
      {user.clearance ?
        <div className='clearance'>
          <Link to={`/categories/edit/${category.id}`}>
            <button>Edit</button>
          </Link>
          <Link to={`/categories/delete/${category.id}`}>
            <button className='delete'>Delete</button>
          </Link>
        </div>
        : null}
      <div className='list'>
        {quizzes.length ?
          quizzes.map((quiz: Quiz, idx: number) => {
            return (
              <QuizCard key={quiz.id} quiz={quiz} timing={idx} />
            )
          })
          :
          <p className='none-yet'>No {category.title.toLowerCase()} quizzes, yet!</p>}
      </div>
    </div>
  );
}