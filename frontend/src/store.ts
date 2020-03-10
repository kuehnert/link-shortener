import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import counterReducer from "./features/counter/CounterSlice";
import shortLinkReducer from "./features/links/ShortLinkSlice";
import globalReducer from "./features/globals/GlobalSlice";
import userReducer from "./features/users/UserSlice";

export const rootReducer = combineReducers({
  counter: counterReducer,
  global: globalReducer,
  links: shortLinkReducer,
  users: userReducer
});

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export default store;
