import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom";

export const SignUpPage = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onChangeName = (e: any) => setName(e.target.value); 
    const onChangeEmail = (e: any) => setEmail(e.target.value); 
    const onChangePassword = (e: any) => setPassword(e.target.value)

    return (
        <div className="">
            <form action="" onSubmit={onSubmit}>
                <div className="mt-5">
                    <label>Name</label>
                    <input type="text" id="name" value={name} className="border-2" onChange={onChangeName}/>
                </div>
                <div className="mt-5">
                    <label>Email</label>
                    <input type="email" id="email" value={email} className="border-2" onChange={onChangeEmail}/>
                </div>
                
               <div className="mt-5">
                    <label>Password</label>
                    <input type="password" id="password" value={password} className="border-2" onChange={onChangePassword}/>
               </div>
               <div className="my-4">
                    <button className="btn border-t-cyan-600">
                        Register
                    </button>
               </div>
               
            </form>
        </div>
    )
}