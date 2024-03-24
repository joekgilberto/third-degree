import './SubmissionShow.css';

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as submissionServices from '../../utilities/submission/submission-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Submission, Question } from '../../utilities/types';

import SubmissionQuestion from '../../components/SubmissionQuestion/SubmissionQuestion';
import Loading from '../../components/Loading/Loading';

export default function SubmissionShow() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [submission, setSubmission] = useState<Submission>();
    const [quiz, setQuiz] = useState<Quiz>();

    async function handleRequest(): Promise<void> {
        if (id) {
            await submissionServices.getSubmission(id).then(async (s: Submission) => {
                setSubmission(s);
                await quizServices.getQuiz(s.quiz).then((q) => {
                    setQuiz(q);
                });
            });
        };
    };

    useEffect(() => {
            dispatch(updateCurrentPage(''));
        handleRequest();
    }, [])

    if (!submission?.id || !quiz?.id) {
        return <Loading />;
    };

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