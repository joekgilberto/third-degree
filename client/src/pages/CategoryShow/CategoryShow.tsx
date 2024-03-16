import './CategoryShow.css';

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import * as categoryServices from '../../utilities/category/category-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Category } from '../../utilities/types';

import QuizCard from '../../components/QuizCard/QuizCard';

export default function CategoryShow() {

  const { id } = useParams();
  const [category, setCategory] = useState<Category>();
  const [quizzes, setQuizzes] = useState<Array<Quiz>>();

  async function handleRequest(){
    await categoryServices.getCategory(id).then(async (c)=>{
      setCategory(c);
      await quizServices.getQuizByCategory(id).then((q)=>{
        setQuizzes(q);
      })
    })
  }

  useEffect(()=>{
    handleRequest()
  },[])

  if(!category || !quizzes){
    return <p>Loading...</p>
  }

  return (
    <div className='CategoryShow'>
      <h2>{category.title} Category</h2>
      <p>Find a <span className='bold'>quiz</span>:</p>
      <hr/>
      {quizzes.map((quiz: Quiz)=>{
        return <QuizCard key={quiz.id} quiz={quiz} />
      })}
    </div>
  );
}