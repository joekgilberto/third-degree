import './Login.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCredentials } from '../../pages/Auth/authSlice';
import * as userServices from '../../utilities/user/user-services';
import { setUser, setUserToken } from '../../utilities/local-storage';
import { User, Credentials } from '../../utilities/types';

export default function Login({ credentials }: { credentials: Credentials }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const update: Credentials = { ...credentials, [e.target.name]: e.target.value };
    dispatch(updateCredentials(update));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (credentials.password) {
      await userServices.loginUser(credentials).then((loggedIn: { user: User, token: string }) => {
        setUserToken(loggedIn.token);
        setUser(loggedIn.user);
        navigate('/');
      });
    };
  };

  return (
    <form className='Login' onSubmit={handleSubmit}>
      <h2>Login to continue your journey...</h2>
      <input name='username' value={credentials.username} placeholder='Enter your username...' onChange={handleChange} required />
      <input name='password' type='password' value={credentials.password} placeholder='Enter your password...' onChange={handleChange} required />
      <input type='submit' value='Login' />
    </form>
  );
};