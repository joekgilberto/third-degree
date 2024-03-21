import './SubmissionCard.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as quizServices from '../../utilities/quiz/quiz-services';
import { Quiz, Submission } from '../../utilities/types';

export default function SubmissionCard({ submission }: { submission: Submission }) {

    const [quiz, setQuiz] = useState<Quiz | null>(null);

    async function handleRequest(): Promise<void> {
        await quizServices.getQuiz(submission.quiz).then((quiz: Quiz) => {
            setQuiz(quiz);
        });
    };

    useEffect(() => {
        handleRequest();
    }, []);

    if (!quiz) {
        return null;
    };

    return (
        <div className='SubmissionCard'>
            <Link to={`/submission/${submission.id}`}>
                <h3>{quiz.title}</h3>
                <hr />
                <p>Your Score: {submission.score}</p>
                <p>Average Score: {quiz.avgScore}</p>
            </Link>
        </div>

    );
};