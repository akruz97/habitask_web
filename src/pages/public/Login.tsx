import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')

    const onSubmit = (e) => {
        e.preventDefault();
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
                    <button className="btn bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 text-white rounded-lg" type="button" >
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