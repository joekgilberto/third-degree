import './Main.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import CategoryIndex from '../../pages/CategoryIndex/CategoryIndex';
import CategoryShow from '../../pages/CategoryShow/CategoryShow';
import CategoryEdit from '../../pages/CategoryEdit/CategoryEdit'
import CategoryDelete from '../../pages/CategoryDelete/CategoryDelete';
import QuizNew from '../../pages/QuizNew/QuizNew';
import QuizShow from '../../pages/QuizShow/QuizShow';
import QuizEdit from '../../pages/QuizEdit/QuizEdit';
import SubmissionShow from '../../pages/SubmissionShow/SubmissionShow';
import Account from '../../pages/Account/Account';
import Auth from '../../pages/Auth/Auth';
import PrivateRoute from '../CustomRoutes/PrivateRoute';
import AuthenticatedRoute from '../CustomRoutes/AuthenticatedRoute';
import ClearanceRoute from '../../components/CustomRoutes/ClearanceRoute';
import Footer from '../../components/Footer/Footer';

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<CategoryIndex />} />
        <Route path='/categories/:id' element={<CategoryShow />} />
        <Route path='/categories/edit/:id' element={
          <ClearanceRoute>
            <CategoryEdit />
          </ClearanceRoute>
        } />
        <Route path='/categories/delete/:id' element={
          <ClearanceRoute>
            <CategoryDelete />
          </ClearanceRoute>
        } />
        <Route path='/quiz/new' element={
          <PrivateRoute>
            <QuizNew />
          </PrivateRoute>
        } />
        <Route path='/quiz/:id' element={
          <PrivateRoute>
            <QuizShow />
          </PrivateRoute>
        } />
        <Route path='/quiz/edit/:id' element={
          <PrivateRoute>
            <QuizEdit />
          </PrivateRoute>
        } />
        <Route path='/submission/:id' element={
          <PrivateRoute>
            <SubmissionShow />
          </PrivateRoute>
        } />
        <Route path='/account' element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        } />
        <Route path='/auth' element={
          <AuthenticatedRoute>
            <Auth />
          </AuthenticatedRoute>
        } />
      </Routes>
      <Footer />
    </main>
  );
};