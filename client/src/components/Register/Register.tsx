import './Register.css';

import React, { useEffect } from 'react';
import { updateReEnter, updateCredentials } from '../../pages/Auth/authSlice';
import { useDispatch } from 'react-redux';
import * as userServices from '../../utilities/user/user-services';
import { User, Credentials } from '../../utilities/types';
import { setUser, setUserToken } from '../../utilities/local-storage';
import { useNavigate } from 'react-router-dom';

export default function Register({ credentials, reEnter }: { credentials: Credentials, reEnter: string }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const update: Credentials = { ...credentials, [e.target.name]: e.target.value};
        dispatch(updateCredentials(update));
    };

    function handleReEnter(e: React.ChangeEvent<HTMLInputElement>): void {
        dispatch(updateReEnter(e.target.value));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (credentials.password === reEnter) {
            await userServices.registerUser(credentials).then(async (user: User) => {
                if(user && credentials.password){
                    await userServices.loginUser(credentials).then((loggedIn: {user: User, token: string}) => {
                        setUserToken(loggedIn.token);
                        setUser(loggedIn.user);
                        navigate('/');
                    })
                } else {
                    console.log('Error: user not successfully created');
                }
            })
        } else {
            console.log('Error: Passwords do not match!')
        }

    }

    return (
        <form className='Register' onSubmit={handleSubmit}>
            <h2>Register to start your journey...</h2>
            <input name='username' value={credentials.username} placeholder='Enter a username...' onChange={handleChange} required />
            <input name='password' value={credentials.password} type='password' placeholder='Enter a password...' onChange={handleChange} required />
            <input name='reEnter' value={reEnter} type='password' placeholder='Re-Enter your password...' onChange={handleReEnter} required />
            <input type='submit' value='Register' />
        </form>
    );
};