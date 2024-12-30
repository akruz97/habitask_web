import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../redux/store"
import { logoutAction } from "../redux/actions/authActions"
import { getUserProfileAction } from "../redux/actions/userActions"

export const Header = () => {

    const dispatch: any = useDispatch();

    const navigate = useNavigate()

    const { profile } = useSelector((state: RootState) => state.user);
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        console.log(profile);
        if(!token){
            dispatch(logoutAction());
            navigate('/login');
            return;
        }
        dispatch(getUserProfileAction());
        
    }, [dispatch]);

    const logout = () => {
        dispatch(logoutAction());
        navigate('/login');
    }

    return (
        <React.Fragment>
            <div className=" px-5 py-5">
                <ul className="flex justify-self-start" >
                <li className="p-4">
                        <Link to="/home">{`${profile.name} ${profile.lastname}`}</Link>
                    </li>
                    <li className="p-4">
                        <Link to="/home">Mi Perfil</Link>
                    </li>
                    <li className="p-4">
                        <Link to="/tasks">Tareas</Link>
                    </li>
                   
                    <li className="p-4">
                        <button onClick={logout} >Salir</button>
                    </li>
                </ul>

            </div>
        </React.Fragment>
    )
}