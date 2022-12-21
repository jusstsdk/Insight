import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import createCourseSlice from "./createCourseSlice";
import courseInfoSlice from "./courseInfoSlice";
import notificationsSlice from "./notificationsSlice";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const combinedReducer = combineReducers({
	userReducer: userSlice,
	createCourseReducer: createCourseSlice,
	courseInfoReducer: courseInfoSlice,
	notificationsReducer: notificationsSlice
});

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = (state, action) => {
	if (action.type === "user/logout") {
		state = undefined;
	}
	return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
});
