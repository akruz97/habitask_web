import { combineReducers } from "redux";

// Authentication
import AuthReducer from "./authReducer";


const rootReducer = combineReducers({
    auth: AuthReducer
});

export default rootReducer;