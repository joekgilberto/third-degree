import './Nav.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <h1>Third<br />Degree</h1>
      <hr />
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
  );
}