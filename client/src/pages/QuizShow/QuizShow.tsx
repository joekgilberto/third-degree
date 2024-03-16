import './QuizShow.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuiz, selectQuiz, selectSubmission } from './quizShowSlice';
import { Answer, Question, Submission } from '../../utilities/types';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../App/store';

import ShowQuestion from '../../components/ShowQuestion/ShowQuestion';

export default function QuizShow() {

    const { id } = useParams();
    const quiz = useSelector(selectQuiz);
    const newSubmission = useSelector(selectSubmission);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadQuiz(id))
        const answerArr: Array<Answer> = [];
        for (let i = 0; i < quiz.questions.length; i++){
            if(quiz.questions[i].type === 'text' || quiz.questions[i].type === 'radio'){
                answerArr.push({
                    id: i,
                    guess: ''
                })
            } else if (quiz.questions[i].type === 'checkbox'){
                answerArr.push({
                    id: i,
                    guesses: []
                })
            }
        }
    }, [])

    if (!quiz.id) {
        return <p>Loading...</p>
    }

    return (
        <div className='QuizShow'>
            <div>
                <h2>{quiz.title}</h2>
                <p>{quiz.questions.length} Questions by {quiz.username}</p>
            </div>
            <div>
                {quiz.avgScore ?
                    <h3>{quiz.avgScore}% average score | {quiz.submissions.length} challengers</h3>
                    :
                    <h3>No challengers, yet!</h3>}
            </div>
            {quiz.questions.map((question: Question) => {
                return <ShowQuestion question={question} />
            })}
        </div>
    );
}