import './Nav.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header>
      <div className='logo'>
        <img src='https://i.imgur.com/wcVN8CX.png' />
        <h1>Third Degree</h1>
      </div>
      <hr />
      <nav>
        <Link to='/'>
          <button>Home</button>
        </Link>
        <Link to='/categories'>
          <button>Categories</button>
        </Link>
        <Link to='/quiz/new'>
          <button>Build a Quiz</button>
        </Link>
        {/* TODO: Toggle Login to profile link when logged in */}
        <button>Login</button>
      </nav>
    </header>
  );
}