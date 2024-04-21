import { configureStore } from "@reduxjs/toolkit";
import voteTimeReducer from "./slices/intervalSlice";

export const store = configureStore({
    reducer: {
        voteTime: voteTimeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;