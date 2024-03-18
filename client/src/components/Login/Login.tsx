import './Login.css';

import React from 'react';
import { updateCredentials } from '../../pages/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { User, Cred } from '../../utilities/types';
import * as userServices from '../../utilities/user/user-services';

export default function Login({ credentials }: { credentials: User }) {

  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const update: User = { ...credentials, cred: { ...credentials.cred, [e.target.name]: e.target.value } };
    dispatch(updateCredentials(update));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cred: Cred = credentials.cred;
    await userServices.loginUser(cred).then((user: User)=>{
      console.log(user);
    });
  }

  return (
    <form className='Login' onSubmit={handleSubmit}>
      <h2>Login to continue your journey...</h2>
      <input name='username' value={credentials.cred.username} placeholder='Enter your username...' onChange={handleChange} required />
      <input name='password' type='password' value={credentials.cred.password} placeholder='Enter your password...' onChange={handleChange} required />
      <input type='submit' value='Login' />
    </form>
  );
}