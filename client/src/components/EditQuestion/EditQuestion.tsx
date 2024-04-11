import './EditQuestion.css';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEditQuiz, updateQuizEdit } from '../../pages/QuizEdit/quizEditSlice';
import { Quiz, Question } from '../../utilities/types';

import EditText from '../../components/EditText/EditText';
import EditRadio from '../../components/EditRadio/EditRadio';
import EditCheckbox from '../../components/EditCheckbox/EditCheckbox';

export default function EditQuestion({ question }: { question: Question }) {

    const editQuiz: Quiz = useSelector(selectEditQuiz);
    const dispatch = useDispatch();

    function handleDelete(e: React.FormEvent<HTMLButtonElement>): void {
        e.preventDefault();

        const questionsCache: Array<Question> = [...editQuiz.questions]
        const idx: number = questionsCache.findIndex((q) => q.id === question.id);

        if (idx > -1) {
            questionsCache.splice(idx, 1);
            for (let i: number = 0; i < questionsCache.length; i++) {
                questionsCache[i] = { ...questionsCache[i], id: i };
            }
            dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionsCache] }));
        } else {
            console.log('Error: Question not found.');
        };
    };

    function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Question = editQuiz.questions[question.id];
        cache = { ...cache, query: e.target.value };

        const questionArr: Array<Question> = [...editQuiz.questions];
        questionArr[question.id] = cache;
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }));
    };

    return (
        <div className='FormQuestion'>
            <div className='number'>
                <h3>Question #{question.id + 1}</h3>
                <button className='delete' onClick={handleDelete}>X</button>
            </div>
            <label className='question'>
                <p>Question:</p>
                <input name='query' value={question.query} placeholder='Type a question' onChange={handleChangeQuery} required />
            </label>
            {question.type === 'text' ?
                <EditText question={question} />
                : question.type === 'radio' ?
                    <EditRadio question={question} />
                    :
                    <EditCheckbox question={question} />
            }
        </div>
    );
};