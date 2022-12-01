import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./login";

const combinedReducer = combineReducers({
	loginReducer: loginSlice,
	// ... more reducers
});
const rootReducer = (state, action) => {
	if (action.type === "login/logout") {
		state = undefined;
	}
	return combinedReducer(state, action);
};

export default configureStore({
	reducer: rootReducer,
});
