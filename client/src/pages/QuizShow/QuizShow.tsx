import './QuizShow.css';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuiz, selectQuiz, selectSubmission, updateSubmissionNew } from './quizShowSlice';
import { selectUser, updateUser } from '../../App/appSlice';
import { updateCurrentPage } from '../../components/Header/navSlice';
import * as quizServices from '../../utilities/quiz/quiz-services';
import * as submissionServices from '../../utilities/submission/submission-services';
import * as userServices from '../../utilities/user/user-services';
import * as localStorageTools from '../../utilities/local-storage';
import { AppDispatch } from '../../App/store';
import { Answer, Question, Quiz, Submission, User } from '../../utilities/types';

import ShowQuestion from '../../components/ShowQuestion/ShowQuestion';
import Loading from '../../components/Loading/Loading';

export default function QuizShow() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const newSubmission: Submission = useSelector(selectSubmission);
    const quiz: Quiz = useSelector(selectQuiz);
    const user: User = useSelector(selectUser);
    const [retakeId, setRetakeId] = useState<string | null>(null);
    const [deleteToggle, setDeleteToggle] = useState<boolean>(false);


    async function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        quizServices.destroyQuiz(quiz.id).then(() => {
            navigate(`/`);
        });
    };

    async function handleRetake(u: User): Promise<void> {
        if (u.submissions.length) {
            await submissionServices.getUserSubmissions(u).then((s) => {
                s.forEach((foundSubmission: Submission) => {
                    if (foundSubmission.quiz === id) {
                        setRetakeId(id);
                    };
                });
            });
        };
    };

    async function handleAddSubmission(submission: Submission): Promise<void> {
        if (submission?.id && user) {
            if (retakeId) {
                const submissions: Array<string> = [...user.submissions];
                const idx: number = submissions.indexOf(retakeId);
                submissions.splice(idx, 1, submission.id);
                await userServices.addSubmission(user.id, submissions).then((u: User) => {
                    localStorageTools.setUser(u);
                    if (u) {
                        dispatch(updateUser(u));
                    } else {
                        dispatch(updateUser({
                            id: '',
                            username: '',
                            submissions: [],
                            clearance: 0
                        }));
                    };
                    handleQuizUpdate(submission);
                })
            } else {
                const submissions: Array<string> = [...user.submissions];
                submissions.push(submission.id);
                await userServices.addSubmission(user.id, submissions).then((u: User) => {
                    localStorageTools.setUser(u);
                    if (u) {
                        dispatch(updateUser(u));
                    } else {
                        dispatch(updateUser({
                            id: '',
                            username: '',
                            submissions: [],
                            clearance: 0
                        }));
                    };
                    handleQuizUpdate(submission);
                });
            };
        };
    };

    async function handleQuizUpdate(s: Submission): Promise<void> {
        if (s.id) {
            const updatedQuiz: Quiz = { ...quiz };
            if (updatedQuiz.submissions) {
                updatedQuiz.submissions = [...updatedQuiz.submissions, s.id];
                if (updatedQuiz.avgScore !== 0 && !updatedQuiz.avgScore) {
                    updatedQuiz.avgScore = s.score;
                } else {
                    let scoreMinusAvg: number = s.score - updatedQuiz.avgScore;
                    let count: number = updatedQuiz.submissions.length;
                    let difference: number = scoreMinusAvg / count;
                    updatedQuiz.avgScore += difference;
                }
                await quizServices.updateQuiz(quiz.id, updatedQuiz).then(() => {
                    navigate(`/submission/${s.id}`);
                });
            };
        };
    };

    function handleScore(submission: Submission): number {
        let correct: number = 0;
        for (let i: number = 0; i < quiz.questions.length; i++) {
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
                    };
                };
                if (includes) {
                    correct++;
                };
            };
        };
        return (correct / quiz.questions.length) * 100;
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        await submissionServices.createSubmission({ ...newSubmission, score: handleScore(newSubmission) }).then(async (submission: Submission) => {
            handleAddSubmission(submission);
        });
    };

    useEffect(() => {
        dispatch(updateCurrentPage(''));
        handleRetake(user);
    }, []);

    useEffect(() => {
        dispatch(loadQuiz(id));
    }, [dispatch]);

    useEffect(() => {
        if (quiz.id) {
            const answerArr: Array<Answer> = [];
            for (let i: number = 0; i < quiz.questions.length; i++) {
                answerArr.push({
                    id: i,
                    guess: '',
                    guesses: []
                });
            };
            dispatch(updateSubmissionNew({
                ...newSubmission,
                answers: answerArr,
                quiz: quiz.id,
                username: user.username,
                challenger: user.id
            }));
        };
    }, [quiz]);

    if (!quiz?.id || !newSubmission.answers?.length) {
        return <Loading />;
    };

    return (
        <div className='QuizShow'>
            <div>
                <h2>{quiz.title}</h2>
                <p>{quiz.questions.length} Questions by {quiz.username}</p>
            </div>
            <div>
                {quiz.avgScore || quiz.avgScore === 0 ?
                    <h3>{quiz.avgScore.toFixed(2)}% average score | {quiz.submissions.length} challengers</h3>
                    :
                    <h3>No challengers, yet!</h3>}
            </div>
            <form onSubmit={handleSubmit}>
                {quiz.questions.map((question: Question) => {
                    return <ShowQuestion question={question} />
                })}
                <input type='submit' value='Submit' />
                {user.id === quiz.author || user.clearance >= 1 ?
                    <>
                        <Link to={`/quiz/edit/${quiz.id}`}>
                            <button>Edit</button>
                        </Link>
                        {!deleteToggle ?
                            <button onClick={(e) => setDeleteToggle(true)}>Delete</button>
                            :
                            <div>
                                <p>Are you sure you want to delete your spectacular, one-of-a-kind quiz?</p>
                                <button onClick={handleDelete}>Confirm</button>
                                <button onClick={(e) => setDeleteToggle(false)}>Exit</button>
                            </div>
                        }
                    </>
                    : null}
            </form>
        </div>
    );
};