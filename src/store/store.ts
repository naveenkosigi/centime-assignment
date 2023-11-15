import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { inflowReducerSlice } from "./reducers";

export const store = configureStore({
  reducer: {expensesFlow : inflowReducerSlice.reducer}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
