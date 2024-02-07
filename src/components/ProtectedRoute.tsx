import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { UserTypes } from "../config/types";

const ProtectedRoute = ({ children }: { children: ReactNode}) => {
    const user = useSelector((state: {User: {user: UserTypes}}) => state.User);
    if(user.user == null){
        return <Navigate to={'/login'}/>
    }
    return children
};

export default ProtectedRoute;
