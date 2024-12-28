import React from "react"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <React.Fragment>
            <div className=" px-5 py-5">
                <ul className="flex justify-self-start" >
                    <li className="p-4">
                        <Link to="/">Mi Perfil</Link>
                    </li>
                    <li className="p-4">
                        <Link to="tasks">Tareas</Link>
                    </li>
                   
                    <li className="p-4">
                        <a href="">Logout</a>
                    </li>
                </ul>

            </div>
        </React.Fragment>
    )
}