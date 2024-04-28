import { configureStore } from "@reduxjs/toolkit";
import voteTimeReducer from "./slices/intervalSlice";
import isVotingTimeReducer from "./slices/isVotingTimeSlice";

export const store = configureStore({
    reducer: {
        voteTime: voteTimeReducer,
        isVotingTime: isVotingTimeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;