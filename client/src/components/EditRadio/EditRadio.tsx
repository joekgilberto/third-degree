import './EditRadio.css';

import React from 'react';
import { selectEditQuiz, updateQuizEdit } from '../../pages/QuizEdit/quizEditSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Quiz, Question, Choices } from '../../utilities/types';

export default function EditRadio({ question }: { question: Question }) {

    const editQuiz: Quiz = useSelector(selectEditQuiz);
    const dispatch = useDispatch();

    function handleAddChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        let cache: Choices = { ...editQuiz.questions[question.id].choices };

        if (!editQuiz.questions[question.id].choices.c?.length && editQuiz.questions[question.id].choices.c !== '') {
            cache.c = '';
        } else if (!editQuiz.questions[question.id].choices.d?.length && editQuiz.questions[question.id].choices.d !== '') {
            cache.d = '';
        };
        
        const questionArr: Array<Question> = [...editQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } };
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }));
    };

    function handleDeleteChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        let cache: Choices = { ...editQuiz.questions[question.id].choices };
        const questionArr: Array<Question> = [...editQuiz.questions]

        if ('d' in cache) {
            delete cache.d;
            if(questionArr[question.id].answer === 'd'){
                questionArr[question.id] = { ...questionArr[question.id], answer: '' }
            };
        } else {
            delete cache.c;
            if(questionArr[question.id].answer === 'c'){
                questionArr[question.id] = { ...questionArr[question.id], answer: '' }
            };
        };

        questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } }
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }))
    };

    function handleChangeChoice(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Choices = editQuiz.questions[question.id].choices;
        cache = { ...cache, [e.target.name]: e.target.value }

        const questionArr: Array<Question> = [...editQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], choices: cache };
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }));
    };

    function handleAnswer(e: React.ChangeEvent<HTMLSelectElement>): void {
        let cache: Question = editQuiz.questions[question.id];
        cache = { ...cache, answer: e.target.value };

        const questionArr: Array<Question> = [...editQuiz.questions];
        questionArr[question.id] = cache;
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }));
    };

    return (
        <div className='FormRadio'>
            <div className='radio-choices'>
                <label>A&#41;
                    <input name='a' placeholder='Enter choice A' value={question.choices.a} onChange={handleChangeChoice} required />
                </label>
                <label>B&#41;
                    <input name='b' placeholder='Enter choice B'value={question.choices.b} onChange={handleChangeChoice} required />
                </label>
                {editQuiz.questions[question.id].choices.c?.length || editQuiz.questions[question.id].choices.c === '' ?
                    <label>C&#41;
                        <input name='c' placeholder='Enter choice C' value={question.choices.c} onChange={handleChangeChoice} required />
                        {editQuiz.questions[question.id].choices.d?.length || editQuiz.questions[question.id].choices.d !== '' ?
                            <button onClick={handleDeleteChoice}>X</button>
                            : null}
                    </label>
                    : null}
                {editQuiz.questions[question.id].choices.d?.length || editQuiz.questions[question.id].choices.d === '' ?
                    <label>D&#41;
                        <input name='d' placeholder='Enter choice D' value={question.choices.d} onChange={handleChangeChoice} required />
                        <button onClick={handleDeleteChoice}>X</button>
                    </label>
                    : null}
                {!editQuiz.questions[question.id].choices.d?.length && editQuiz.questions[question.id].choices.d !== '' ?
                    <button onClick={handleAddChoice}>+ Add a Choice</button>
                    :
                    null}
            </div>
            <div>
                <h3>Answer:</h3>
                <select name='answer' defaultValue={editQuiz.questions[question.id].answer} onChange={handleAnswer} required >
                    <option disabled value=''>Choose an Answer</option>
                    <option value='a'>A</option>
                    <option value='b'>B</option>
                    {editQuiz.questions[question.id].choices.c?.length || editQuiz.questions[question.id].choices.c === '' ?
                        <option value='c'>C</option>
                        : null}
                    {editQuiz.questions[question.id].choices.d?.length || editQuiz.questions[question.id].choices.d === '' ?
                        <option value='d'>D</option>
                        : null}
                </select>
            </div>
        </div>
    );
};