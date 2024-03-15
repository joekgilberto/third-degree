import './Nav.css';

import React from 'react';

export default function Nav() {
  return (
    <nav>
      <h1>Third<br/>Degree</h1>
      <hr />
      <button>Home</button>
      <button>Categories</button>
      <button>Build a Quiz</button>
      {/* TODO: Toggle Login to profile link when logged in */}
      <button>Login</button>
    </nav>
  );
}