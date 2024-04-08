import './NewCheckbox.css';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNewQuiz, updateQuizNew } from '../../pages/QuizNew/quizNewSlice';
import { Quiz, Question, Choices } from '../../utilities/types';

export default function NewCheckbox({ question }: { question: Question }) {

    const newQuiz: Quiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    function handleAddChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();

        let cache: Choices = { ...newQuiz.questions[question.id].choices }

        if (!newQuiz.questions[question.id].choices.c?.length && newQuiz.questions[question.id].choices.c !== '') {
            cache.c = '';
        } else if (!newQuiz.questions[question.id].choices.d?.length && newQuiz.questions[question.id].choices.d !== '') {
            cache.d = '';

        };
        const questionArr: Array<Question> = [...newQuiz.questions]
        questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } }
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }))
    };

    function handleDeleteChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();

        let choicesCache: Choices = { ...newQuiz.questions[question.id].choices };
        let answersCache: Array<string> = [...newQuiz.questions[question.id].answers];

        if ('d' in choicesCache) {
            delete choicesCache.d;
            if (answersCache.includes('d')) {
                const idx: number = answersCache.indexOf('d');
                answersCache.splice(idx, 1);
            };
        } else {
            delete choicesCache.c;
            if (answersCache.includes('c')) {
                const idx: number = answersCache.indexOf('c');
                answersCache.splice(idx, 1);
            };
        };

        const questionArr: Array<Question> = [...newQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], choices: { ...choicesCache }, answers: answersCache };
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    function handleChangeChoice(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Choices = newQuiz.questions[question.id].choices;
        cache = { ...cache, [e.target.name]: e.target.value };

        const questionArr: Array<Question> = [...newQuiz.questions]
        questionArr[question.id] = { ...questionArr[question.id], choices: cache };
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    function handleAnswer(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Array<string> = newQuiz.questions[question.id].answers;

        cache = [...cache]
        if (!cache.includes(e.target.value)) {
            cache = [...cache, e.target.value];
        } else {
            const idx: number = cache.indexOf(e.target.value);
            cache.splice(idx, 1);
        };

        const questionArr: Array<Question> = [...newQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], answers: cache };
        dispatch(updateQuizNew({ ...newQuiz, questions: [...questionArr] }));
    };

    return (
        <div className='FormCheckbox'>
            <h3 className='options'>Options</h3>
            <div className='checkbox-choices'>
                <label>
                    <p>A&#41;</p>
                    <input name='a' placeholder='Enter choice A' onChange={handleChangeChoice} required />
                </label>
                <label>
                    <p>B&#41;</p>
                    <input name='b' placeholder='Enter choice B' onChange={handleChangeChoice} required />
                </label>
                {newQuiz.questions[question.id].choices.c?.length || newQuiz.questions[question.id].choices.c === '' ?
                    <label>
                        <p>C&#41;</p>
                        <input name='c' placeholder='Enter choice C' onChange={handleChangeChoice} required />
                        {newQuiz.questions[question.id].choices.d?.length || newQuiz.questions[question.id].choices.d !== '' ?
                            <button className='remove-choice' onClick={handleDeleteChoice}>X</button>
                            : null}
                    </label>
                    : null}
                {newQuiz.questions[question.id].choices.d?.length || newQuiz.questions[question.id].choices.d === '' ?
                    <label>
                        <p>D&#41;</p>
                        <input name='d' placeholder='Enter choice D' onChange={handleChangeChoice} required />
                        <button className='remove-choice' onClick={handleDeleteChoice}>X</button>
                    </label>
                    :
                    <button onClick={handleAddChoice}>+ Add a Choice</button>
                }
            </div>
            <div className='answer'>
                <h3>Answer&#40;s&#41;:</h3>
                <div className='answer-choices'>
                    <label>
                        <p>A&#41;</p>
                        <input type='checkbox' value='a' onChange={handleAnswer} />
                    </label>
                    <label>
                        <p>B&#41;</p>
                        <input type='checkbox' value='b' onChange={handleAnswer} />
                    </label>
                    {newQuiz.questions[question.id].choices.c?.length || newQuiz.questions[question.id].choices.c === '' ?
                        <label>
                            <p>C&#41;</p>
                            <input type='checkbox' value='c' onChange={handleAnswer} />
                        </label>
                        : null}
                    {newQuiz.questions[question.id].choices.d?.length || newQuiz.questions[question.id].choices.d === '' ?
                        <label>
                            <p>D&#41;</p>
                            <input type='checkbox' value='d' onChange={handleAnswer} />
                        </label>
                        : null}
                </div>
            </div>
        </div>
    );
};