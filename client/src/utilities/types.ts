export interface Quiz {
    id: string;
    title: string;
    questions: Array<Question>;
    submissions: Array<string>;
    postingDate: Date;
    username: string;
    author: string;
    category: string;
}

export interface Submission {
    id: string;
    answers: Array<Answer>;
    score: number;
    username: string;
    submissionDate: Date;
    challenger: string;
}

export interface Category {
    id: string;
    title: string;
}

export interface Profile {
    id: string;
    username: string;
    submissions: Array<string>;
    clearance: number;
}

export type User = {
    id: string,
    username: string,
    password: string,
    submissions: Array<string>;
    clearance: number;
}

export type Question = {
    id: number,
    type: string,
    image: string,
    query: string,
    choices?: Array<string>,
    answer: string
}

export type Answer = {
    id: number,
    guess: string
}