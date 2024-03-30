import './EditCheckbox.css';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEditQuiz, updateQuizEdit } from '../../pages/QuizEdit/quizEditSlice';
import { Quiz, Question, Choices } from '../../utilities/types';

export default function EditCheckbox({ question }: { question: Question }) {

    const editQuiz: Quiz = useSelector(selectEditQuiz);
    const dispatch = useDispatch();

    function handleAddChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        let cache: Choices = { ...editQuiz.questions[question.id].choices }

        if (!editQuiz.questions[question.id].choices.c?.length && editQuiz.questions[question.id].choices.c !== '') {
            cache.c = '';
        } else if (!editQuiz.questions[question.id].choices.d?.length && editQuiz.questions[question.id].choices.d !== '') {
            cache.d = '';
        };
        const questionArr: Array<Question> = [...editQuiz.questions]
        questionArr[question.id] = { ...questionArr[question.id], choices: { ...cache } }
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }))
    };

    function handleDeleteChoice(e: React.MouseEvent<HTMLButtonElement>): void {
        let choicesCache: Choices = { ...editQuiz.questions[question.id].choices };
        let answersCache: Array<string> = [...editQuiz.questions[question.id].answers];

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

        const questionArr: Array<Question> = [...editQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], choices: { ...choicesCache }, answers: answersCache };
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }));
    };

    function handleChangeChoice(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Choices = editQuiz.questions[question.id].choices;
        cache = { ...cache, [e.target.name]: e.target.value };

        const questionArr: Array<Question> = [...editQuiz.questions]
        questionArr[question.id] = { ...questionArr[question.id], choices: cache };
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }));
    };

    function handleCehcked(value: string): boolean {
        if (editQuiz.questions[question.id].answers.includes(value)) {
            return true;
        }
        return false;
    }

    function handleAnswer(e: React.ChangeEvent<HTMLInputElement>): void {
        let cache: Array<string> = editQuiz.questions[question.id].answers;

        cache = [...cache]
        if (!cache.includes(e.target.value)) {
            cache = [...cache, e.target.value];
        } else {
            const idx: number = cache.indexOf(e.target.value);
            cache.splice(idx, 1);
        };

        const questionArr: Array<Question> = [...editQuiz.questions];
        questionArr[question.id] = { ...questionArr[question.id], answers: cache };
        dispatch(updateQuizEdit({ ...editQuiz, questions: [...questionArr] }));
    };

    return (
        <div className='FormCheckbox'>
            <div className='radio-choices'>
                <label>A&#41;
                    <input name='a' placeholder='Enter choice A' value={question.choices.a} onChange={handleChangeChoice} required />
                </label>
                <label>B&#41;
                    <input name='b' placeholder='Enter choice B' value={question.choices.b} onChange={handleChangeChoice} required />
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
                    : <button onClick={handleAddChoice}>+ Add a Choice</button>}
            </div>
            <div>
                <h3>Answer&#40;s&#41;:</h3>
                <label>
                    <input type='checkbox' value='a' onChange={handleAnswer} checked={handleCehcked('a')} />
                    A
                </label>
                <label>
                    <input type='checkbox' value='b' onChange={handleAnswer} checked={handleCehcked('b')} />
                    B
                </label>
                {editQuiz.questions[question.id].choices.c?.length || editQuiz.questions[question.id].choices.c === '' ?
                    <label>
                        <input type='checkbox' value='c' onChange={handleAnswer} checked={handleCehcked('c')} />
                        C
                    </label>
                    : null}
                {editQuiz.questions[question.id].choices.d?.length || editQuiz.questions[question.id].choices.d === '' ?
                    <label>
                        <input type='checkbox' value='d' onChange={handleAnswer} checked={handleCehcked('d')} />
                        D
                    </label>
                    : null}
            </div>
        </div>
    );
};