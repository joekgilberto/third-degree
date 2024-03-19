import './SubmissionShow.css';

import React, { useEffect, useState } from 'react';
import { Quiz, Submission, Question, User } from '../../utilities/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as submissionServices from '../../utilities/submission/submission-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as localStorageTools from '../../utilities/local-storage';
import SubmissionQuestion from '../../components/SubmissionQuestion/SubmissionQuestion';

export default function SubmissionShow() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [submission, setSubmission] = useState<Submission>();
    const [quiz, setQuiz] = useState<Quiz>();

    async function handleRequest() {
        if (id) {
            await submissionServices.getSubmission(id).then(async (s: Submission) => {
                console.log(s)
                setSubmission(s);
                await quizServices.getQuiz(s.quiz).then((q) => {
                    setQuiz(q);
                })
            })
        }
    }
    
    useEffect(() => {
        const fetchedUser: User | null = localStorageTools.getUser();
        if (!fetchedUser) {
            navigate('/auth');
        } else {
            setUser(fetchedUser);
            handleRequest();
        };
    }, [])

    if (!user || !submission?.id || !quiz?.id) {
        return <p>Loading...</p>
    }

    return (
        <div className='SubmissionShow'>
            <div>
                <h2>{quiz.title}</h2>
                <p>{quiz.questions.length} Questions by {quiz.username}</p>
            </div>
            <div>
                <h3>Your score: {submission.score.toFixed(2)}%</h3>
            </div>
            <div>
                {quiz.questions.map((question: Question, idx: number) => {
                    return <SubmissionQuestion question={question} answer={submission.answers[idx]} />
                })}
                <Link to={`/quiz/${quiz.id}`}>
                    <button>Try Again</button>
                </Link>
                <Link to='/categories'>
                    <button>Find Another Quiz</button>
                </Link>
            </div>
        </div>
    );
}