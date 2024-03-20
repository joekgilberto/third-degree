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

    function handleDelete(e: React.FormEvent<HTMLButtonElement>): void{
        const questionsCache: Array<Question> = [...editQuiz.questions]
        const idx: number = questionsCache.findIndex((q)=>q.id === question.id);
        if (idx > -1){
            questionsCache.splice(idx,1);
            for (let i: number = 0; i < questionsCache.length; i++){
                questionsCache[i] = {...questionsCache[i], id: i};
            }
            dispatch(updateQuizEdit({...editQuiz, questions: [...questionsCache]}));
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
        <div className='EditQuestion'>
            <h3>Question #{question.id + 1} <button onClick={handleDelete}>X</button></h3>
            <input name='query' placeholder='Type a question' onChange={handleChangeQuery} required />
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