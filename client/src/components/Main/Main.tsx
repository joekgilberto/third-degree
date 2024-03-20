import './Main.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import CategoryIndex from '../../pages/CategoryIndex/CategoryIndex';
import CategoryShow from '../../pages/CategoryShow/CategoryShow';
import QuizNew from '../../pages/QuizNew/QuizNew';
import QuizShow from '../../pages/QuizShow/QuizShow';
import QuizEdit from '../../pages/QuizEdit/QuizEdit';
import SubmissionShow from '../../pages/SubmissionShow/SubmissionShow';
import Account from '../../pages/Account/Account';
import Auth from '../../pages/Auth/Auth';
import PrivateRoute from '../CustomRoutes/PrivateRoute';

//TODO adds PrivateRoutes
//TODO if logged in, redirect Auth to Account
export default function Main() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<CategoryIndex />} />
        <Route path='/categories/:id' element={<CategoryShow />} />
        <Route path='/quiz/new' element={<QuizNew />} />
        <Route path='/quiz/:id' element={<QuizShow />} />
        <Route path='/quiz/edit/:id' element={<QuizEdit />} />
        <Route path='/submission/:id' element={<SubmissionShow />} />
        <Route path='/account' element={<Account />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </main>
  );
};