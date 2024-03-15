import './Main.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import CategoryIndex from '../../pages/CategoryIndex/CategoryIndex';
import CategoryShow from '../../pages/CategoryShow/CategoryShow';

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<CategoryIndex />} />
        <Route path='/categories/:id' element={<CategoryShow />} />
      </Routes>
    </main>
  );
}