import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logoutAction } from "../../redux/actions/authActions";


const Protected = (props : any) =>{
  const dispatch : any = useDispatch();
  const {  loading, token } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    const tok = localStorage.getItem('token');
    if (!tok) {
      dispatch(logoutAction());
      return;
    }
  }, [dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (loading && !token) {
    dispatch(logoutAction());
    return (
      <React.Fragment>
        <Navigate to={{ pathname: "/login"}} />
      </React.Fragment>
    );
  }

  return <>{props.children}</>;
};


export default Protected;
