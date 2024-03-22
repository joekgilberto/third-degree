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
};

export interface Submission {
    id?: string;
    answers: Array<Answer>;
    score: number;
    submissionDate: Date;
    username: string;
    challenger: string;
    quiz: string;
};

export interface Category {
    id?: string;
    title: string;
};

export interface User {
    id: string,
    username: string,
    submissions: Array<string>;
    clearance: number;
};

export interface Credentials {
    username: string,
    password: string
};

export interface Question {
    id: number,
    type: string,
    image?: string,
    query: string,
    choices: Choices,
    answer: string,
    answers: Array<string>
};

export interface Choices {
    a: string,
    b: string,
    c?: string,
    d?: string
}

export interface Answer {
    id: number,
    guess: string,
    guesses: string[]
};