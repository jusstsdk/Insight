import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import subtitleSlice from "./subtitleSlice";
import exerciseSlice from "./exerciseSlice";
const combinedReducer = combineReducers({
	userReducer: userSlice,
	subtitleReducer: subtitleSlice,
	exerciseReducer: exerciseSlice,
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
