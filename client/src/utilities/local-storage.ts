import { User } from "./types";

function getUserToken(): string | null {
    return localStorage.getItem("token");
};

function setUserToken(token: string): void {
    if (token) {
        localStorage.setItem("token", token);
    }
};

function clearUserToken(): void {
    localStorage.setItem("token", "");
};

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

function setUser(user: User): void {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
};

function clearUser(): void {
    localStorage.setItem("user", "");
};

export { getUserToken, setUserToken, clearUserToken, getUser, setUser, clearUser };
