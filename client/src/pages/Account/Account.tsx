import './Account.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as submissionServices from '../../utilities/submission/submission-services';
import * as localStoage from '../../utilities/local-storage';
import { Quiz, Submission, User } from '../../utilities/types';

export default function Account() {

    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [submissions, setSubmissions] = useState<Array<Submission> | null>(null);

    useEffect(() => {
        const fetchedUser: User | null = localStoage.getUser();
        if (!fetchedUser) {
            navigate('/auth');
        } else {
            setUser(fetchedUser);
        };
    }, [])

    async function handleReqeust(u: User) {
        await submissionServices.getSubmissionList(u.submissions).then(async (s) => {
            if (s.length) {
                setSubmissions(s)
            }
        })
    }

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div className='Account'>
            <h2>Welcome back, {user.username}!</h2>
            <hr />
            <h3>Submissions:</h3>
            {submissions?.length ?
                submissions.map((s: Submission)=>{
                    return <SubmissionCard submission={s} />
                })
                :
                <p>No submissions, yet!</p>}
        </div>
    );
};