export interface Quiz {
    id?: string;
    title: string;
    questions: Array<Question>;
    submissions: Array<string>;
    avgScore?: number;
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

export interface User {
    id: string,
    username: string,
    password: string,
    submissions: Array<string>;
    clearance: number;
}

export interface Question {
    id: number,
    type: string,
    image?: string,
    query: string,
    choices?: {
        a?: string,
        b?: string,
        c?: string,
        d?: string
    },
    answer?: string,
    answers?: Array<string>
}

export interface Answer {
    id: number,
    guess: string
}