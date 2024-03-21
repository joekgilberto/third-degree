import './App.css';

import React, { useEffect, useState } from 'react';
import * as localStorageTools from '../utilities/local-storage';
import { useDispatch } from 'react-redux';
import { updateUser } from './appSlice';
import { AppDispatch } from './store';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import { decodeToken } from '../utilities/tools';

export default function App() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  function handleLogout(): void{
    localStorageTools.clearUserToken();
    localStorageTools.clearUser();
    dispatch((updateUser({
      id: '',
      username: '',
      submissions: [],
      clearance: 0
  })))
  }

  useEffect(() => {
    const fetchedUser = localStorageTools.getUser();
    if (fetchedUser) {
      dispatch(updateUser(fetchedUser));
    }

    const token = localStorageTools.getUserToken();
    if (token) {
      const { exp } = decodeToken(token);
      if (exp) {
        if (Date.now() >= exp * 1000) {
          handleLogout()
        }
      } else {
        handleLogout()
      }
    }
  }, [])

  return (
    <div className='App' >
      <Header />
      <Main />
    </div>
  );
};