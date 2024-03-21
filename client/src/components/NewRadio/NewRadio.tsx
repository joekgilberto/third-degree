import './NewRadio.css';

import React from 'react';

import { selectNewQuiz, updateQuizNew } from '../../pages/QuizNew/quizNewSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Quiz, Question, Choices } from '../../utilities/types';

export default function NewRadio({ question }: { question: Question }) {

    const newQuiz: Quiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    function handleAddChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        let cache: Choices = { ...newQuiz.questions[question.id].choices };

        if (!newQuiz.questions[question.id].choices.c?.length && newQuiz.questions[question.id].choices.c !== '') {
            cache.c = '';
        } else if (!newQuiz.questions[question.id].choices.d?.length && newQuiz.questions[question.id].choices.d !== '') {
            cache.d = '';
        };

        const questionArr: Array<Question> = [...newQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } };
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    function handleDeleteChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        let cache: Choices = { ...newQuiz.questions[question.id].choices };
        const questionArr: Array<Question> = [...newQuiz.questions]

        if ('d' in cache) {
            delete cache.d;
            if(questionArr[question.id].answer === 'd'){
                questionArr[question.id] = { ...questionArr[question.id], answer: '' }
            }
        } else {
            delete cache.c;
            if(questionArr[question.id].answer === 'c'){
                questionArr[question.id] = { ...questionArr[question.id], answer: '' }
            }
        };

        questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } }
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }))
    };

    function handleChangeChoice(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Choices = newQuiz.questions[question.id].choices;
        cache = { ...cache, [e.target.name]: e.target.value }

        const questionArr: Array<Question> = [...newQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], choices: cache };
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    function handleAnswer(e: React.ChangeEvent<HTMLSelectElement>): void {
        let cache: Question = newQuiz.questions[question.id];
        cache = { ...cache, answer: e.target.value };

        const questionArr: Array<Question> = [...newQuiz.questions];
        questionArr[question.id] = cache;
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    return (
        <div className='NewRadio'>
            <div className='radio-choices'>
                <label>A&#41;
                    <input name='a' placeholder='Enter choice A' onChange={handleChangeChoice} required />
                </label>
                <label>B&#41;
                    <input name='b' placeholder='Enter choice B' onChange={handleChangeChoice} required />
                </label>
                {newQuiz.questions[question.id].choices.c?.length || newQuiz.questions[question.id].choices.c === '' ?
                    <label>C&#41;
                        <input name='c' placeholder='Enter choice C' onChange={handleChangeChoice} required />
                        {newQuiz.questions[question.id].choices.d?.length || newQuiz.questions[question.id].choices.d !== '' ?
                            <button onClick={handleDeleteChoice}>X</button>
                            : null}
                    </label>
                    : null}
                {newQuiz.questions[question.id].choices.d?.length || newQuiz.questions[question.id].choices.d === '' ?
                    <label>D&#41;
                        <input name='d' placeholder='Enter choice D' onChange={handleChangeChoice} required />
                        <button onClick={handleDeleteChoice}>X</button>
                    </label>
                    : 
                    <button onClick={handleAddChoice}>+ Add a Choice</button>}
            </div>
            <div>
                <h3>Answer #{question.id + 1}</h3>
                <select name='answer' defaultValue={''} onChange={handleAnswer} required >
                    <option disabled value=''>Choose an Answer</option>
                    <option value='a'>A</option>
                    <option value='b'>B</option>
                    {newQuiz.questions[question.id].choices.c?.length || newQuiz.questions[question.id].choices.c === '' ?
                        <option value='c'>C</option>
                        : null}
                    {newQuiz.questions[question.id].choices.d?.length || newQuiz.questions[question.id].choices.d === '' ?
                        <option value='d'>D</option>
                        : null}
                </select>
            </div>
        </div>
    );
};