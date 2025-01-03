import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validations";
import PasswordStrength from "../../components/PasswordStrength";
import { RegisterData } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions/authActions";
import { RootState } from "../../redux/store";
import { resetFlagsRegister } from "../../redux/slices/authReducer";
import { toast } from "react-toastify";

export const SignUpPage = () => {

    const [name, setName] = useState<string>('');
    const [lastname, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [strength, setStrength] = useState(null)

    const dispatch: any = useDispatch();

    const { 
        errorRegister,
        successRegister,
        loadingRegister
     } = useSelector((state: RootState) => state.auth);

     const navigate = useNavigate();

    const [error, setError] = useState<{
        email: string | null, password: string | null
    }>({
        email: null,
        password: null
    });

    useEffect(() => {
        if(errorRegister && errorRegister.length){
            toast(errorRegister, { type: 'error' });
            resetFlagsRegister();
            return;
        }

        if(successRegister && successRegister.length){
            toast(successRegister, { type: 'success' });
            resetFlagsRegister();
            navigate("/login");
            return;
        }
    }, [
        errorRegister,
        successRegister
    ])

    const onSubmit = (e) => {
        e.preventDefault();

        let data: RegisterData = {
            name,
            lastname,
            email,
            password
        };

        dispatch(registerAction(data));
    }

    const onChangeName = (e: any) => setName(e.target.value); 
    const onChangeLastName = (e: any) => setLastName(e.target.value);
    const onChangeEmail = (e: any) => setEmail(e.target.value); 

    const onValidateEmail = () => {
        if(!validateEmail(email)){
            setError({
                ...error,
                email: 'Email incorrecto'
            });
            return;
        }
        setError({
            ...error,
            email: null
        });
           
    }

    const clearError = () => {
        setError({ 
            email: null,
            password: null
         })
    }

    const handleChangePassword = (e: any) => {
        let password: string = e.target.value;
        setPassword(password);
        setError({
            ...error,
            password: null
        });
        let capsCount, smallCount, numberCount, symbolCount;
        if (!password.length) {
            setError({
                ...error,
                password: null
            });
        } else if (password.length < 8) {
            setError({
                ...error,
                password:  '* La contraseña debe tener un mínimo de 8, incluye una MAYÚSCULA, una minúscula, un número y un carácter especial: @$! % * ? &',
            });

          return;
        } else {
          capsCount = (password.match(/[A-Z]/g) || []).length;
          smallCount = (password.match(/[a-z]/g) || []).length;
          numberCount = (password.match(/[0-9]/g) || []).length;
          symbolCount = (password.match(/\W/g) || []).length;
          if (capsCount < 1) {
            setError({
                ...error,
                password:  '* Debe contener una letra MAYÚSCULAS',
            });
            return;
          } else if (smallCount < 1) {
            setError({
                ...error,
                password:  '* Debe contener una letra minúscula',
            });
         
            return;
          } else if (numberCount < 1) {
            setError({
                ...error,
                password:  '* Debe contener un número',
            });
            return;
          } else if (symbolCount < 1) {
            setError({
                ...error,
                password:  '* Debe contener un carácter especial: @$! % * ? &',
            });
            return;
          }
        }
      };

    const dataHandler = async childData => {
      setStrength(childData);
    };

    return (
        <div className="">
            <form action="" onSubmit={onSubmit}>
                <div className="mt-5">
                    <p>Name</p>
                    <input type="text" 
                            id="name" 
                            value={name} 
                            className="border-2" 
                            onChange={onChangeName}
                            maxLength={30}
                            />
                  
                </div>
                <div className="mt-5">
                    <p>Lastname</p>
                    <input type="text" 
                            id="name" 
                            value={lastname} 
                            className="border-2" 
                            onChange={onChangeLastName}
                            maxLength={30}
                            />
                  
                </div>
                <div className="mt-5">
                    <p>Email</p>
                    <input type="email" 
                            id="email" 
                            value={email} 
                            className={`border-2 ${email.length > 0 && error.email && 'border-red-500'}`}
                            onChange={onChangeEmail}
                            onBlur={() => onValidateEmail()}
                            onFocus={() => clearError()}
                            />
                    {
                       email.length > 0 && error.email && <p className="text-red-500">{'El correo ingresado no tiene un formato válido'}</p>
                    }
                </div>
                
               <div className="mt-5">
                    <p>Password</p>
                    <input type="password" id="password" value={password} className="border-2" onChange={handleChangePassword}/>
                    {
                       password.length > 0 && error.password && <p className="text-red-500 text-xs">{error.password}</p>
                    }
                    <PasswordStrength 
                        password={password}
                        actions={dataHandler}
                    />
               </div>
               <div className="my-4">
                    <button className="btn bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 text-white rounded-lg">
                        Register
                    </button>
               </div>
               
            </form>
        </div>
    )
}