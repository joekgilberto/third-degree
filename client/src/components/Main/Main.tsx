import './Main.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import CategoryIndex from '../../pages/CategoryIndex/CategoryIndex';
import CategoryShow from '../../pages/CategoryShow/CategoryShow';
import QuizNew from '../../pages/QuizNew/QuizNew';
import QuizShow from '../../pages/QuizShow/QuizShow';
import SubmissionShow from '../../pages/SubmissionShow/SubmissionShow';
import Auth from '../../pages/Auth/Auth';

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<CategoryIndex />} />
        <Route path='/categories/:id' element={<CategoryShow />} />
        <Route path='/quiz/new' element={<QuizNew />} />
        <Route path='/quiz/:id' element={<QuizShow />} />
        <Route path='/submission/:id' element={<SubmissionShow />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </main>
  );
};