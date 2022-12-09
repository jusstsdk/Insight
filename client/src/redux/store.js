import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import subtitleSlice from "./subtitleSlice";
import exerciseSlice from "./exerciseSlice";
import createCourseSlice from "./createCourseSlice";
import infoSlice from "./infoSlice";
const combinedReducer = combineReducers({
	userReducer: userSlice,
	subtitleReducer: subtitleSlice,
	exerciseReducer: exerciseSlice,
	createCourseReducer: createCourseSlice,
	infoReducer: infoSlice,
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
