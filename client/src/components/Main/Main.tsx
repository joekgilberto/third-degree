import './Main.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import CategoriesIndex from '../../pages/CategoriesIndex/CategoriesIndex';

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesIndex />} />
      </Routes>
    </main>
  );
}