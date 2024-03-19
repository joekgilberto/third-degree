import { jwtDecode } from "jwt-decode";

export function decodeToken(token: string): string {
    return jwtDecode(token);
}