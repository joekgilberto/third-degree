import './Nav.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentPage } from './navSlice';

export default function Nav() {

  const currentPage: string = useSelector(selectCurrentPage);

  function handlePage(page: string): string {
    if (page === currentPage) {
      return 'current-page';
    };
    return '';
  };

  return (
    <header>
      <Link to='/'>
        <div className='logo'>
          <img src='https://i.imgur.com/wcVN8CX.png' />
          <h1>Third Degree</h1>
        </div>
      </Link>
      <nav>
        <div className='pages'>
          <Link to='/'>
            <button className={handlePage('home')}>Home</button>
          </Link>
          <Link to='/categories'>
            <button className={handlePage('categories')}>Categories</button>
          </Link>
          <Link to='/quiz/new'>
            <button className={handlePage('new')}>Build a Quiz</button>
          </Link>
        </div>
        {/* TODO: Toggle Login to profile link when logged in */}
        <Link to='/auth'>
          <button className='auth'>Login</button>
        </Link>
      </nav>
    </header>
  );
};