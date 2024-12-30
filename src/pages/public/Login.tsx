import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { loginAction } from "../../redux/actions/authActions";
import { LoginData } from "../../interfaces";
import { clearMessage } from "../../redux/slices/authReducer";
import { toast } from "react-toastify";
import { Input, Typography } from "@material-tailwind/react";

export const LoginPage = () => {

    const dispatch: any = useDispatch();

    const { 
        errorMessage,
        status
     } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState<string>('jcruzal97+t1@gmail.com');
    const [password, setPassword] = useState<string>('Barce@123')

    const navigate = useNavigate();

    useEffect(() => {
        if(errorMessage && errorMessage?.length){
            toast(errorMessage, { type: 'error' });
            dispatch(clearMessage());
            return;
        }

        if(status === 'authenticated'){
            navigate('/home');
            return;
        }
    }, [errorMessage, status])

    const onSubmit = (e) => {
        e.preventDefault();

        let data: LoginData = { email, password };

        console.log(data);
        dispatch(loginAction(data));
    }

    const onChangeEmail = (e: any) => setEmail(e.target.value); 
    const onChangePassword = (e: any) => setPassword(e.target.value)

    return (
        <div className="flex">
            <form action="" className="mx-auto mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"  onSubmit={onSubmit}>
                <div className="justify-items-start">
              
                    <Typography variant="h6" color="blue-gray" className="">
                        Email
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                        type="email" 
                        id="email" 
                        value={email}  
                        onChange={onChangeEmail}
                    />
                   
                </div>
                
               <div className="mt-5 justify-items-start">
                    <Typography variant="h6" color="blue-gray" className="">
                       Password
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                        className: "before:content-none after:content-none",
                        }}
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={onChangePassword}
                    />
                   
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