import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { loginAction } from "../../redux/actions/authActions";
import { LoginData } from "../../interfaces";
import { clearMessage } from "../../redux/slices/authReducer";

export const LoginPage = () => {

    const dispatch: any = useDispatch();

    const { 
        errorMessage
     } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState<string>('jose.cruzal@outlook.com');
    const [password, setPassword] = useState<string>('jcruz123')

    useEffect(() => {
        if(errorMessage && errorMessage?.length){
            alert(errorMessage);
            dispatch(clearMessage());
            return;
        }
    }, [errorMessage])

    const onSubmit = (e) => {
        e.preventDefault();

        let data: LoginData = { email, password };

        console.log(data);
        dispatch(loginAction(data));
    }

    const onChangeEmail = (e: any) => setEmail(e.target.value); 
    const onChangePassword = (e: any) => setPassword(e.target.value)

    return (
        <div className="mx-auto">
            <form action="" onSubmit={onSubmit}>
                <div className="mt-5">
                    <label>Email</label>
                    <input type="email" id="email" value={email} className="border-2" onChange={onChangeEmail}/>
                </div>
                
               <div className="mt-5">
                    <label>Password</label>
                    <input type="password" id="password" value={password} className="border-2" onChange={onChangePassword}/>
               </div>
               <div className="my-4">
                    <button  className="btn bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 text-white rounded-lg" type="submit" >
                        Login
                    </button>
               </div>
               <div>
                <p>¿No tienes una cuenta? <Link to={'/signup'} >Crear una cuenta</Link></p>
               </div>
            </form>
        </div>
    )
}