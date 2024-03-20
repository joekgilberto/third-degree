import './App.css';

import React, { useEffect } from 'react';
import * as localStorageTools from '../utilities/local-storage';
import { useDispatch } from 'react-redux';
import { updateUser } from './appSlice';
import { AppDispatch } from './store';

import Nav from '../components/Nav/Nav';
import Main from '../components/Main/Main';

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchedUser = localStorageTools.getUser();
    if(fetchedUser){
      dispatch(updateUser(fetchedUser));
    }
  }, [])

  return (    
    <div className = 'App' >
      <Nav />
      <Main />
    </div>
  );
};