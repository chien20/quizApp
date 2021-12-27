export type IndexedObject<V = any> = { [k: string]: V };

export type Func = (...args: any) => void;

export type Quiz = {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
};

export type AnswerObj = {
    question: string,
    answer: string,
    answerCorrect: string,
};

