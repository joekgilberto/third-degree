import './Auth.css';

import React, { useState } from 'react';

import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

export default function Auth() {

    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div className='Auth'>
            {toggle ?
                <Register />
                :
                <Login />
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