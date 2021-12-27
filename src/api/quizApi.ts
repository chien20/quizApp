import { Difficulty, IndexedObject } from "utils/types";
import axiosClient from "./axios-interceptor";

export type ParamsQuiz = {
    amount: number;
    difficulty: Difficulty;
    category?: number | string
}

const quizApi : IndexedObject = {
    getQuestions: (params : ParamsQuiz) => {
        const url = '/api.php';
        return axiosClient.get(url, {params});
    }
}

export default quizApi