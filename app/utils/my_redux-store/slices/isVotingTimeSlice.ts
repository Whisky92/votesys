import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IsVotingTime {
    canVote: boolean;
    canSeeResults: boolean;
}

interface IsVotingTimeState {
    value: IsVotingTime;
}

const initialState: IsVotingTimeState = {
    value: {
        canVote: false,
        canSeeResults: false
    }
}

const isVotingTimeSlice = createSlice({
    name: "isvotingtime",
    initialState,
    reducers: {
        changeCanVote: (state, action: PayloadAction<boolean>) => {
            state.value.canVote = action.payload;
        },
        changeCanSeeResults: (state, action: PayloadAction<boolean>) => {
            state.value.canSeeResults = action.payload;
        }
    }
})

export const { changeCanVote, changeCanSeeResults } = isVotingTimeSlice.actions;

export default isVotingTimeSlice.reducer;