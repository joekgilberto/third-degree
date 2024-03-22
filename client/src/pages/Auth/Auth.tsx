import './Auth.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCredentials, selectReEnter, updateCredentials, updateReEnter } from './authSlice';
import { Credentials } from '../../utilities/types';

import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

export default function Auth() {

    const dispatch = useDispatch();
    const credentials: Credentials = useSelector(selectCredentials);
    const reEnter: string = useSelector(selectReEnter);
    const [toggle, setToggle] = useState<boolean>(false);

    useEffect(() => {
        dispatch(updateCredentials({ username: '', password: '' }));
        dispatch(updateReEnter(''));
    }, []);

    return (
        <div className='Auth'>
            {toggle ?
                <Register credentials={credentials} reEnter={reEnter} />
                :
                <Login credentials={credentials} />
            }
            {
                toggle ?
                    <button onClick={(e) => setToggle(false)}>Login</button>
                    :
                    <button onClick={(e) => setToggle(true)}>Register</button>
            }

        </div>
    );
};