import './Login.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../App/appSlice';
import { updateCredentials } from '../../pages/Auth/authSlice';
import * as userServices from '../../utilities/user/user-services';
import * as localStorageTools from '../../utilities/local-storage';
import { User, Credentials } from '../../utilities/types';

export default function Login({ credentials }: { credentials: Credentials }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const update: Credentials = { ...credentials, [e.target.name]: e.target.value };
    dispatch(updateCredentials(update));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    await userServices.loginUser(credentials).then((loggedIn: { user: User, token: string }) => {
      localStorageTools.setUserToken(loggedIn.token);
      localStorageTools.setUser(loggedIn.user);
      if (loggedIn.user) {
        dispatch(updateUser(loggedIn.user));
      } else {
        dispatch(updateUser({
          id: '',
          username: '',
          submissions: [],
          clearance: 0
        }));
      }
      navigate('/');
    });
  };

  return (
    <form className='Login' onSubmit={handleSubmit}>
      <h2>Login to continue your journey...</h2>
      <input name='username' value={credentials.username} placeholder='Enter your username...' onChange={handleChange} autoComplete='username' required />
      <input type='password' name='password' value={credentials.password} placeholder='Enter your password...' onChange={handleChange} autoComplete='current-password' required />
      <input type='submit' value='Login' />
    </form>
  );
};