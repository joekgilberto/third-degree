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
                <h3 className='underline'>{quiz.title}</h3>
                <p>Your Score: {submission.score.toFixed(2)}%</p>
                <p>Average Score: {quiz.avgScore || quiz.avgScore === 0 ? quiz.avgScore.toFixed(2) : 'None yet'}%</p>
            </Link>
        </div>

    );
};