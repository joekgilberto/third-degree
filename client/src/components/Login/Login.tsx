import './Login.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../App/appSlice';
import { updateCredentials } from '../../pages/Auth/authSlice';
import * as userServices from '../../utilities/user/user-services';
import * as localStorageTools from '../../utilities/local-storage';
import { User, Credentials } from '../../utilities/types';

import Banner from '../Banner/Banner';

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
      <Banner source='https://images.unsplash.com/photo-1570212851230-2554ff99f925?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' altText='gold colored and silver colored padlocks' sub='Login today!' link='https://unsplash.com/@kenziem' credit='Mackenzie Marco' />
      <div className='inputs'>
        <label>
          <p>Username</p>
          <input name='username' value={credentials.username} placeholder='Enter your username...' onChange={handleChange} autoComplete='username' required />
        </label>
        <label>
          <p>Password</p>
          <input type='password' name='password' value={credentials.password} placeholder='Enter your password...' onChange={handleChange} autoComplete='current-password' required />
        </label>
        <input className='submit' type='submit' value='Login' />
      </div>
    </form>
  );
};