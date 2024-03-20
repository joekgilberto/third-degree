import './Nav.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentPage } from './navSlice';
import * as localStorageTools from '../../utilities/local-storage';
import { User } from '../../utilities/types';
import { selectUser } from '../../App/appSlice';

export default function Nav() {

  const currentPage: string = useSelector(selectCurrentPage);
  const user = useSelector(selectUser);

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
        {user.id ?
          <Link to='/account'>
            <button className='auth'>@ {user.username}</button>
          </Link>
          :
          <Link to='/auth'>
            <button className='auth'>Login</button>
          </Link>
        }
      </nav>
    </header>
  );
};