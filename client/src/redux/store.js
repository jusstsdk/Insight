import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const combinedReducer = combineReducers({
	userReducer: userSlice,
	// ... more reducers
});
const rootReducer = (state, action) => {
	if (action.type === "user/logout") {
		state = undefined;
	}
	return combinedReducer(state, action);
};

export default configureStore({
	reducer: rootReducer,
});
