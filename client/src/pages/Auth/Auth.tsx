import './Auth.css';

import React, { useState } from 'react';

import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { useSelector } from 'react-redux';
import { selectCredentials, selectReEnter } from './authSlice';
import { Credentials } from '../../utilities/types';

export default function Auth() {

    //TODO: Reset credentials everytime you open the page
    const credentials: Credentials = useSelector(selectCredentials);
    const reEnter: string = useSelector(selectReEnter);
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className='Auth'>
            {toggle ?
                <Register credentials={credentials} reEnter={reEnter} />
                :
                <Login credentials={credentials} />
            }
            {
                toggle?
                <button onClick={(e)=>setToggle(false)}>Login</button>
                :
                <button onClick={(e)=>setToggle(true)}>Register</button>
            }

        </div>
    );
}