import './Account.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as submissionServices from '../../utilities/submission/submission-services';
import * as localStorageTools from '../../utilities/local-storage';
import { Submission, User } from '../../utilities/types';

import SubmissionCard from '../../components/SubmissionCard/SubmissionCard';
import { useSelector } from 'react-redux';
import { selectUser } from '../../App/appSlice';

export default function Account() {

    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [submissions, setSubmissions] = useState<Array<Submission> | null>(null);

    useEffect(() => {
        if(!user.id){
            navigate('/auth')
        } else {
            handleReqeust();
        }
    }, [])

    async function handleReqeust() {
        await submissionServices.getSubmissionList(user).then(async (s) => {
            console.log(s)
            if (s.length) {
                setSubmissions(s)
            }
        })
    }

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
        </div>
    );
};