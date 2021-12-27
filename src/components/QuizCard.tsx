import { Dispatch } from 'app/hooks';
import { checkAnswer } from 'features/quiz/quizSlice';
import React from 'react';
import './QuizCard.scss';
import {
    SmallDashOutlined,
  } from '@ant-design/icons';

type PropsQuizCard = {
    questionCurrent: number;
    answers: string[];
    answerCorrect: string;
    question: string;
    totalQuestions: number;
    answered: boolean,
    userAnswer: string,
    category: string,
    difficulty: string
};

const QuizCard : React.FC<PropsQuizCard> = ({questionCurrent, answers, difficulty, category, userAnswer, answerCorrect, question, totalQuestions, answered}) => {
    const dispatch = Dispatch();
    
    return (
        <div className='quiz_card'>
            <p className='number'>
                Question : <b>{questionCurrent}</b> / {totalQuestions} <SmallDashOutlined /> Category: <b>{category}</b> <SmallDashOutlined /> Difficulty: <b>{difficulty}</b>
            </p>
            <p className='question'>{question}</p>
            <div className='answers'>
            {answers.map((answer : string) => (
                <div
                    key={answer}
                    className='answer'
                >
                    <button disabled={answered}
                        className={`${answered && answer===userAnswer ? 'user_answer' : ''} ${answered && answer===answerCorrect ? 'answer_correct' : ''}`}
                        onClick={() => dispatch(checkAnswer({
                            answer: answer,
                            question: question,
                            answerCorrect: answerCorrect,
                        }))}>
                        {answer}
                    </button>
                </div>
            ))}
            </div>
        </div>
    );
}

export default QuizCard;