import { jwtDecode } from 'jwt-decode';

export function decodeToken(token: string) {
    return jwtDecode(token);
};

export function capitalize(title: string): string {
    const titleArr: Array<string> = title.split(' ');
    for (let i = 0; i < titleArr.length; i++){
        titleArr[i] = titleArr[i].charAt(0).toUpperCase() + titleArr[i].slice(1).toLowerCase();
    }
    const newTitle: string = titleArr.join(' ');
    return newTitle;
}