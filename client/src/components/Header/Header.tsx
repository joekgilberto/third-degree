import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../App/appSlice';
import { selectCurrentPage } from './navSlice';
import { User } from '../../utilities/types';

export default function Header() {

  const currentPage: string = useSelector(selectCurrentPage);
  const user: User | null = useSelector(selectUser);

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
          {user.id ?
          <Link to='/quiz/new'>
            <button className={handlePage('new')}>New Quiz</button>
          </Link>
          :null}
        </div>
        {user.id ?
          <Link to='/account'>
            <button className='auth'>@{user.username}</button>
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