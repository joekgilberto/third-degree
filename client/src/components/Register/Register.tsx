import './Register.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../App/appSlice';
import { updateReEnter, updateCredentials } from '../../pages/Auth/authSlice';
import * as userServices from '../../utilities/user/user-services';
import * as localStorageTools from '../../utilities/local-storage';
import { User, Credentials } from '../../utilities/types';

export default function Register({ credentials, reEnter }: { credentials: Credentials, reEnter: string }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const update: Credentials = { ...credentials, [e.target.name]: e.target.value };
        dispatch(updateCredentials(update));
    };

    function handleReEnter(e: React.ChangeEvent<HTMLInputElement>): void {
        dispatch(updateReEnter(e.target.value));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (credentials.password === reEnter) {
            await userServices.registerUser(credentials).then(async (user: User) => {
                if (user && credentials.password) {
                    await userServices.loginUser(credentials).then((loggedIn: { user: User, token: string }) => {
                        localStorageTools.setUserToken(loggedIn.token);
                        localStorageTools.setUser(loggedIn.user);
                        dispatch(updateUser(loggedIn.user))
                        setError(null);
                        navigate('/');
                    })
                } else {
                    setError('Error: user not successfully created');
                }
            })
        } else {
            setError('Error: Passwords do not match!');
        }

    }

    return (
        <form className='Register' onSubmit={handleSubmit}>
            <h2>Register to start your journey...</h2>
            <input name='username' value={credentials.username} placeholder='Enter a username...' onChange={handleChange} autoComplete='username' required />
            <input type='password' name='password' value={credentials.password} placeholder='Enter a password...' onChange={handleChange} autoComplete='new-password' required />
            <input type='password' name='reEnter' value={reEnter} placeholder='Re-Enter your password...' onChange={handleReEnter} autoComplete='new-password' required />
            <input type='submit' value='Register' />
            {error ?
                <p>{error}</p>
                :
                null}
        </form>
    );
};