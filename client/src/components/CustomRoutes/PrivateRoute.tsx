//Imports useEffect form React, useNavigate from react-router-dom, getUserToken and getUser from local storage tools, and decodeToken from auth-tools
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as tools from '../../utilities/tools';
import * as localStorageTools from '../../utilities/local-storage';

//Exports route that takes in child components and renders them, unless there is no token or if there is no user or if the user id doesnt equare to the JWT token's decoded id- then the user is routed to the Auth page
//Inteded to protect pages so only properly logged in users can access it
export default function PrivateRoute({ children }:{children: JSX.Element}) {
    const navigate = useNavigate();

    function evalCurrentUser() {
        const user = localStorageTools.getUser();
        const token = localStorageTools.getUserToken();


        if (!user || !token) {
            navigate("/auth");
        }

        if(token){
            const userDecoded = tools.decodeToken(token);
            console.log(userDecoded)
            if (user?._id !== userDecoded.nameid) {
                navigate("/auth");
            }
        }
    }

    useEffect(() => {
        evalCurrentUser()
    }, []);

    return children;
}