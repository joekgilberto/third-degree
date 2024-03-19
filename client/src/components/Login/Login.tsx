import './Login.css';

import React from 'react';
import { updateCredentials } from '../../pages/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { User } from '../../utilities/types';
import { setUser, setUserToken } from '../../utilities/local-storage';
import * as userServices from '../../utilities/user/user-services';
import { useNavigate } from 'react-router-dom';

export default function Login({ credentials }: { credentials: User }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const update: User = { ...credentials, [e.target.name]: e.target.value };
    dispatch(updateCredentials(update));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (credentials.password) {
      await userServices.loginUser({ username: credentials.username, password: credentials.password }).then((loggedIn: { user: User, token: string }) => {
        setUserToken(loggedIn.token);
        setUser(loggedIn.user);
        navigate('/');
      });
    }
  }

  return (
    <form className='Login' onSubmit={handleSubmit}>
      <h2>Login to continue your journey...</h2>
      <input name='username' value={credentials.username} placeholder='Enter your username...' onChange={handleChange} required />
      <input name='password' type='password' value={credentials.password} placeholder='Enter your password...' onChange={handleChange} required />
      <input type='submit' value='Login' />
    </form>
  );
}