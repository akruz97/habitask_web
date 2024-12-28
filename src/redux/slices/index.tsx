import { combineReducers } from "redux";

// Authentication
import AuthReducer from "./authReducer";
import TaskReducer from "./taskReducer";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    task: TaskReducer,
    user: UserReducer
});

export default rootReducer;