import './NewCheckbox.css';

import React from 'react';

import { updateNewQuiz, selectNewQuiz } from '../../pages/NewQuiz/newQuizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Quiz, Question } from '../../utilities/types';

export default function NewCheckbox({ question }: { question: Question }) {

    const newQuiz: Quiz = useSelector(selectNewQuiz);
    const dispatch = useDispatch();

    function handleAddChoice(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(!newQuiz.questions[question.id].choices?.c?.length)
        console.log(newQuiz.questions[question.id].choices?.c !== '')
        if (!newQuiz.questions[question.id].choices?.c?.length && newQuiz.questions[question.id].choices?.c !== '') {
            let cache = { ...newQuiz.questions[question.id].choices }
            cache.c = '';

            const questionArr: Array<Question> = [...newQuiz.questions]
            questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } }
            dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
        } else if (!newQuiz.questions[question.id].choices?.d?.length && newQuiz.questions[question.id].choices?.d !== '') {
            let cache = { ...newQuiz.questions[question.id].choices }
            cache.d = '';

            const questionArr: Array<Question> = [...newQuiz.questions]
            questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } }
            dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
        }
    }

    function handleDeleteChoice(e: React.MouseEvent<HTMLButtonElement>) {
        let choicesCache = { ...newQuiz.questions[question.id].choices };
        let answersCache = newQuiz.questions[question.id].answers;
        if (answersCache){
            answersCache = [...answersCache]
        }

        if ('d' in choicesCache) {
            delete choicesCache.d
            if (answersCache && answersCache.includes('d')){
                const idx: number = answersCache.indexOf('d');
                answersCache.splice(idx, 1);
            }
        } else {
            delete choicesCache.c
            if (answersCache && answersCache.includes('c')){
                const idx: number = answersCache.indexOf('c');
                answersCache.splice(idx, 1);
            }
        }

        const questionArr: Array<Question> = [...newQuiz.questions]
        if (answersCache){
            questionArr[question.id] = { ...questionArr[question.id], choices: { ...choicesCache }, answers: answersCache };
        } else {
            questionArr[question.id] = { ...questionArr[question.id], choices: { ...choicesCache } };
        }
        dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
    }

    function handleChangeChoice(e: React.ChangeEvent<HTMLInputElement>) {
        let cache = newQuiz.questions[question.id].choices;
        cache = { ...cache, [e.target.name]: e.target.value }
        const questionArr: Array<Question> = [...newQuiz.questions]
        questionArr[question.id] = { ...questionArr[question.id], choices: cache };
        dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
    }

    function handleAnswer(e: React.ChangeEvent<HTMLInputElement>) {
        let cache = newQuiz.questions[question.id].answers;

        if (cache) {
            cache = [...cache]
            if (!cache.includes(e.target.value)) {
                cache = [...cache, e.target.value];
                const questionArr: Array<Question> = [...newQuiz.questions];
                questionArr[question.id] = { ...questionArr[question.id], answers: cache };
                dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
            } else {
                const idx: number = cache.indexOf(e.target.value);
                cache.splice(idx, 1);
                const questionArr: Array<Question> = [...newQuiz.questions];
                questionArr[question.id] = { ...questionArr[question.id], answers: cache };
                dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
            }
        }
    }

    return (
        <div className='NewCheckbox'>
            <div className='radio-choices'>
                <label>A&#41;
                    <input name='a' placeholder='Enter choice A' onChange={handleChangeChoice} required />
                </label>
                <label>B&#41;
                    <input name='b' placeholder='Enter choice B' onChange={handleChangeChoice} required />
                </label>
                {newQuiz.questions[question.id].choices?.c?.length || newQuiz.questions[question.id].choices?.c === '' ?
                    <label>C&#41;
                        <input name='c' placeholder='Enter choice C' onChange={handleChangeChoice} required />
                        {newQuiz.questions[question.id].choices?.d?.length || newQuiz.questions[question.id].choices?.d !== '' ?
                            <button onClick={handleDeleteChoice}>X</button>
                            : null}
                    </label>
                    : null}
                {newQuiz.questions[question.id].choices?.d?.length || newQuiz.questions[question.id].choices?.d === '' ?
                    <label>D&#41;
                        <input name='d' placeholder='Enter choice D' onChange={handleChangeChoice} required />
                        <button onClick={handleDeleteChoice}>X</button>
                    </label>
                    : null}
                {!newQuiz.questions[question.id].choices?.d?.length && newQuiz.questions[question.id].choices?.d !== '' ?
                    <button onClick={handleAddChoice}>+ Add a Choice</button>
                    :
                    null}
            </div>
            <div>
                <h3>Answer #{question.id + 1}</h3>
                <label>
                    <input type='checkbox' value='a' onChange={handleAnswer} />
                    A
                </label>
                <label>
                    <input type='checkbox' value='b' onChange={handleAnswer} />
                    B
                </label>
                {newQuiz.questions[question.id].choices?.c?.length || newQuiz.questions[question.id].choices?.c === '' ?
                    <label>
                        <input type='checkbox' value='c' onChange={handleAnswer} />
                        C
                    </label>
                    : null}
                {newQuiz.questions[question.id].choices?.d?.length || newQuiz.questions[question.id].choices?.d === '' ?
                    <label>
                        <input type='checkbox' value='d' onChange={handleAnswer} />
                        D
                    </label>
                    : null}
            </div>
        </div>
    );
}