import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import createCourseSlice from "./createCourseSlice";
import infoSlice from "./infoSlice";
import notificationsSlice from "./notificationsSlice";
const combinedReducer = combineReducers({
	userReducer: userSlice,
	createCourseReducer: createCourseSlice,
	infoReducer: infoSlice,
	notificationsReducer: notificationsSlice,
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
