import React, { useEffect } from "react";
import { Header } from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getUserProfileAction } from "../../redux/actions/userActions";
import { Typography } from "@material-tailwind/react";

export const HomePage = () => {

    const dispatch: any = useDispatch();

    const { profile } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getUserProfileAction())
    }, [dispatch])

    return (
        <React.Fragment>
            <div className="page">
                <Typography variant="h3" color="blue-gray">
                Perfil
                </Typography>
                <Typography className="-mb-2 mt-5" variant="h5">
                    {`${profile.name} ${profile.lastname}`}
                    </Typography>
                <Typography className="-mb-2 mt-5" variant="h5">
                {`${profile.email} `}
                </Typography>
            </div>
           
        </React.Fragment>
   
    )
}