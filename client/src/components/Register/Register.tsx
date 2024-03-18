import './Register.css';

import React, { useEffect } from 'react';
import { updateReEnter, updateCredentials } from '../../pages/Auth/authSlice';
import { useDispatch } from 'react-redux';
import * as userServices from '../../utilities/user/user-services';
import { User } from '../../utilities/types';

export default function Register({ credentials, reEnter }: { credentials: User, reEnter: string }) {

    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const update: User = { ...credentials, cred: { ...credentials.cred, [e.target.name]: e.target.value } };
        dispatch(updateCredentials(update));
    }

    function handleReEnter(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(updateReEnter(e.target.value));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(credentials)
        if(credentials.cred.password===reEnter){
            await userServices.registerUser(credentials).then((user: User)=>{
                console.log(user);
            })
        } else {
            console.log('Error: Passwords do not match!')
        }

    }

    useEffect(() => {
        console.log(credentials)
    }, [credentials])

    return (
        <form className='Register' onSubmit={handleSubmit}>
            <h2>Register to start your journey...</h2>
            <input name='username' value={credentials.cred.username} placeholder='Enter a username...' onChange={handleChange} required />
            <input name='password' value={credentials.cred.password} type='password' placeholder='Enter a password...' onChange={handleChange} required />
            <input name='reEnter' value={reEnter} type='password' placeholder='Re-Enter your password...' onChange={handleReEnter} required />
            <input type='submit' value='Register' />
        </form>
    );
}