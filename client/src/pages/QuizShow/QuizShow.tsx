import './QuizShow.css';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuiz, selectQuiz, selectSubmission, updateSubmissionNew } from './quizShowSlice';
import { Answer, Question, Quiz, Submission, User } from '../../utilities/types';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../App/store';
import * as submissionServices from '../../utilities/submission/submission-services';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as userServices from '../../utilities/user/user-services';
import * as localStorageTools from '../../utilities/local-storage';

import ShowQuestion from '../../components/ShowQuestion/ShowQuestion';

export default function QuizShow() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [retakeId, setRetakeId] = useState<string | null>(null);
    const quiz = useSelector(selectQuiz);
    const newSubmission = useSelector(selectSubmission);
    const dispatch = useDispatch<AppDispatch>();

    async function handleRetake(u: User) {
        await submissionServices.getSubmissionList(u.submissions).then((s) => {
            const found: Submission | undefined = s.find((submission: Submission) => {
                return submission.quiz === id
            })

            if (found?.id) {
                setRetakeId(found.id);
            }
        })
    }

    function handleScore(submission: Submission): number {
        let correct: number = 0;
        for (let i = 0; i < quiz.questions.length; i++) {
            if (quiz.questions[i].type === 'text' || quiz.questions[i].type === 'radio') {
                if (quiz.questions[i].answer === submission.answers[i].guess) {
                    correct++;
                };
            } else if (quiz.questions[i].type === 'checkbox') {
                let includes: boolean = true;
                for (let j = 0; j < quiz.questions[i].answers.length; j++) {
                    if (!submission.answers[i].guesses.includes(quiz.questions[i].answers[j])) {
                        includes = false;
                        break;
                    }
                }
                if (includes) {
                    correct++;
                }
            }
        }

        return (correct / quiz.questions.length) * 100;
    }

    async function handleQuizUpdate(s: Submission) {
        if (s.id) {
            const updatedQuiz: Quiz = { ...quiz };
            if (updatedQuiz.submissions) {
                updatedQuiz.submissions = [...updatedQuiz.submissions, s.id];
                if (!updatedQuiz.avgScore) {
                    updatedQuiz.avgScore = s.score;
                } else {
                    let scoreMinusAvg: number = s.score - updatedQuiz.avgScore;
                    let count: number = updatedQuiz.submissions.length;
                    let increase: number = scoreMinusAvg / count;
                    updatedQuiz.avgScore += increase;
                }
                await quizServices.updateQuiz(quiz.id, updatedQuiz).then(() => {
                    navigate(`/submission/${s.id}`);
                });
            }
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (user) {
            await submissionServices.createSubmission({ ...newSubmission, score: handleScore(newSubmission) }).then(async (submission: Submission) => {
                if (submission?.id) {
                    if (retakeId) {
                        const submissions: Array<string> = [...user.submissions];
                        const idx: number = submissions.indexOf(retakeId);
                        submissions.splice(idx, 1, submission.id)
                        await userServices.addSubmission(user.id, submissions).then((u: User) => {
                            localStorage.setUser(u);
                            handleQuizUpdate(submission);
                        })
                    } else {
                        const submissions: Array<string> = [...user.submissions];
                        submissions.push(submission.id);
                        await userServices.addSubmission(user.id, submissions).then((u: User) => {
                            localStorage.setUser(u);
                            handleQuizUpdate(submission);
                        })
                    }
                }
            })
        }
    }

    useEffect(() => {
        dispatch(loadQuiz(id))
        const fetchedUser: User | null = localStorageTools.getUser();
        if (!fetchedUser) {
            navigate('/auth');
        } else {
            setUser(fetchedUser);
            handleRetake(fetchedUser);
        };
    }, [])

    useEffect(() => {
        if (quiz) {
            const answerArr: Array<Answer> = [];
            for (let i = 0; i < quiz.questions.length; i++) {
                answerArr.push({
                    id: i,
                    guess: '',
                    guesses: []
                })
            }
            dispatch(updateSubmissionNew({
                ...newSubmission,
                answers: answerArr,
                quiz: quiz.id
            }))
        }
    }, [quiz])

    if (!user || !quiz?.id || !newSubmission.answers?.length) {
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
                    <h3>{quiz.avgScore.toFixed(2)}% average score | {quiz.submissions.length} challengers</h3>
                    :
                    <h3>No challengers, yet!</h3>}
            </div>
            <form onSubmit={handleSubmit}>
                {quiz.questions.map((question: Question) => {
                    return <ShowQuestion question={question} />
                })}
                <input type='submit' value='Submit' />
            </form>
        </div>
    );
}