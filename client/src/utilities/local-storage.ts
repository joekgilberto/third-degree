import { User } from "./types";

//Returns local storage of token
function getUserToken(): string | null {
    return localStorage.getItem("token");
};

//Set local storage by token
function setUserToken(token: string): void {
    if (token) {
        localStorage.setItem("token", token);
    }
};

//Clears token instance of local storage
function clearUserToken(): void {
    localStorage.setItem("token", "");
};

//Returns local storage of user
function getUser(): User | undefined | null {
    if (localStorage.getItem("user")) {
        const user: string | null = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
    } else {
        return null;
    }
};

//Set local storage by user
function setUser(user: User): void {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
};

//Clears user instance of local storage
function clearUser(): void {
    localStorage.setItem("user", "");
};

// Exports local storage functions
export { getUserToken, setUserToken, clearUserToken, getUser, setUser, clearUser };
