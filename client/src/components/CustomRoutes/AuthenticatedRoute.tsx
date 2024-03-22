import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as localStorageTools from '../../utilities/local-storage';
import * as tools from '../../utilities/tools';
import { User } from "../../utilities/types";

export default function AuthenticatedRoute({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();

    useEffect(() => {
        const user: User | null | undefined = localStorageTools.getUser();
        const token: string | null = localStorageTools.getUserToken();

        if (user && token) {
            const { nameid } = tools.decodeToken(token);
            if ((user.id === nameid))
                navigate("/account");
        };
    }, []);

    return children;
};