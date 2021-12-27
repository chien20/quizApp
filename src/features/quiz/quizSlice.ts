import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import quizApi, { ParamsQuiz } from 'api/quizApi';
import { AnswerObj, Quiz } from 'utils/types';
import { shuffleArray } from 'utils/utils';

type QuizData = Quiz & { answers: string[] }

type QuizState = {
    loading: boolean,
    quizList: QuizData[],
    number: number,
    score: number,
    gameOver: boolean,
    answered: boolean,
    totalQuestion: number,
    userAnswer: string
}

const initialState : QuizState = {
    loading: false,
    quizList: [],
    number: 0,
    score: 0,
    gameOver: true,
    answered: false,
    totalQuestion: 0,
    userAnswer: ''
}

export const getQuiz = createAsyncThunk('quiz/getQuiz', async (params : ParamsQuiz) => {
    const data = await quizApi.getQuestions(params);
    return data.data.results.map((quiz : Quiz) => ({...quiz, answers : shuffleArray([...quiz.incorrect_answers, quiz.correct_answer])}));
    //trộn câu trả lời đúng và sai lại với nhau
});

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
      checkAnswer: (state, action : PayloadAction<AnswerObj>) => {
          const answersAction = action.payload;
          state.answered = true;
          state.userAnswer = answersAction.answer;
          if(answersAction.answer === answersAction.answerCorrect) {
            state.score += 1;
          }
      },
      nextQuestion: (state, action : PayloadAction<Number>) => {
        state.answered = false;
        state.userAnswer = '';
        if(action.payload === state.quizList.length) {
            state.gameOver = true;
        } else state.number += 1;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getQuiz.pending, (state) => {
            state.loading = true;
        })
        .addCase(getQuiz.fulfilled, (state, action) => {
            state.gameOver = false;
            state.quizList = action.payload;
            state.totalQuestion = action.payload.length;
            state.score = 0;
            state.number = 0;
            state.answered = false;
            state.userAnswer = '';
            state.loading = false;
        })
    },
});
  
export const { checkAnswer, nextQuestion } = quizSlice.actions;

export default quizSlice.reducer;