import { combineReducers } from "redux";

// Authentication
import AuthReducer from "./authReducer";
import TaskReducer from "./taskReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    task: TaskReducer
});

export default rootReducer;