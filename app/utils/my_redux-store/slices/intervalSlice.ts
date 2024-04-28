import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface VoteTime {
    vote_start: Date;
    vote_end: Date;
}

interface VoteTimeState {
    value: VoteTime;
}

const initialState: VoteTimeState = {
    value: {
        vote_start: new Date(Date.parse('2024-04-29T16:39:00+02:00')),
        vote_end: new Date(Date.parse('2024-04-29T16:39:10+02:00'))
    }
}

const voteTimeSlice = createSlice({
    name: "votetime",
    initialState,
    reducers: {
        updateTime: (state, action: PayloadAction<VoteTimeState>) => {
            state.value.vote_start = action.payload.value.vote_start;
            state.value.vote_end = action.payload.value.vote_end;
        }
    }
})

export const { updateTime } = voteTimeSlice.actions;

export default voteTimeSlice.reducer;