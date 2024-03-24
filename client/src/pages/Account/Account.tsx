import './Account.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateUser } from '../../App/appSlice';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as submissionServices from '../../utilities/submission/submission-services';
import * as localStorageTools from '../../utilities/local-storage';
import { Quiz, Submission, User } from '../../utilities/types';

import SubmissionCard from '../../components/SubmissionCard/SubmissionCard';
import QuizCard from '../../components/QuizCard/QuizCard';

export default function Account() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user: User = useSelector(selectUser);
    const [quizzes, setQuizzes] = useState<Array<Quiz> | null>(null);
    const [submissions, setSubmissions] = useState<Array<Submission> | null>(null);


    useEffect(() => {
        dispatch(updateCurrentPage(''));
      }, []);
    
    useEffect(() => {
        if(user.id){
            handleReqeust();
        };
    }, [user]);
    

    async function handleReqeust(): Promise<void> {
        await submissionServices.getUserSubmissions(user).then(async (s) => {
            if (s.length) {
                setSubmissions(s);
            };
            console.log(user)
            await quizServices.getQuizsesByAuthor(user.id).then(async (q) => {
                if (q.length) {
                    setQuizzes(q);
                };
            });
        });
    };

    function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        localStorageTools.clearUser();
        localStorageTools.clearUserToken();
        dispatch((updateUser({
            id: '',
            username: '',
            submissions: [],
            clearance: 0
        })));
        navigate('/');
    };

    return (
        <div className='Account'>
            <h2>Welcome back, {user.username}!</h2>
            <hr />
            <h3>Submissions:</h3>
            {submissions?.length ?
                submissions.map((s: Submission) => {
                    return <SubmissionCard submission={s} />
                })
                :
                <p>No submissions, yet!</p>}
            <hr />
            <h3>Quizzes:</h3>
            {quizzes?.length ?
                quizzes.map((q: Quiz) => {
                    return <QuizCard quiz={q} />
                })
                :
                <p>No quizzes made, yet!</p>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};