import './NewRadio.css';

import React from 'react';

import { updateNewQuiz, selectNewQuiz } from '../../pages/NewQuiz/newQuizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Quiz, Question } from '../../utilities/types';

export default function NewRadio({ question }: { question: Question }) {

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
        let cache = { ...newQuiz.questions[question.id].choices }

        if('d' in cache){
            delete cache.d
        } else {
            delete cache.c
        }

        const questionArr: Array<Question> = [...newQuiz.questions]
        questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } }
        dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
    }

    function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>){
        let cache: Question = newQuiz.questions[question.id];
        cache = {...cache, query: e.target.value}
        const questionArr: Array<Question> = [...newQuiz.questions]
        questionArr[question.id] = cache;
        dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
    }

    function handleChangeChoice(e: React.ChangeEvent<HTMLInputElement>){
        let cache = newQuiz.questions[question.id].choices;
        cache = {...cache, [e.target.name]: e.target.value}
        const questionArr: Array<Question> = [...newQuiz.questions]
        questionArr[question.id] = {...questionArr[question.id], choices: cache};
        dispatch(updateNewQuiz({ ...newQuiz, questions: [...questionArr] }))
    }

    return (
        <div className='NewRadio'>
            <input name='query' placeholder='Type a question' onChange={handleChangeQuery} />
            <div className='radio-choices'>
                <label>A&#41;
                    <input name='a' placeholder='Enter choice A' onChange={handleChangeChoice} />
                </label>
                <label>B&#41;
                    <input name='b' placeholder='Enter choice B' onChange={handleChangeChoice} />
                </label>
                {newQuiz.questions[question.id].choices?.c?.length || newQuiz.questions[question.id].choices?.c === '' ?
                    <label>C&#41;
                        <input name='c' placeholder='Enter choice C' onChange={handleChangeChoice} />
                        {newQuiz.questions[question.id].choices?.d?.length || newQuiz.questions[question.id].choices?.d !== '' ?
                            <button onClick={handleDeleteChoice}>X</button>
                            : null}
                    </label>
                    : null}
                {newQuiz.questions[question.id].choices?.d?.length || newQuiz.questions[question.id].choices?.d === '' ?
                    <label>D&#41;
                        <input name='d' placeholder='Enter choice D' onChange={handleChangeChoice} />
                        <button onClick={handleDeleteChoice}>X</button>
                    </label>
                    : null}
                {!newQuiz.questions[question.id].choices?.d?.length && newQuiz.questions[question.id].choices?.d !== '' ?
                    <button onClick={handleAddChoice}>+ Add a Choice</button>
                    :
                    null}
            </div>
        </div>
    );
}