import React from "react"

interface Props { 
    children: JSX.Element | JSX.Element[] 
}

export const Layout = ({ children }: Props) => {
    return (
        <div className="">
            <div>
                <h1 className="text-center text-3xl">Habitask Web</h1>
            </div>
            {children}
        </div>
    )
}