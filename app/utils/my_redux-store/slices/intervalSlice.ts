import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface VoteTime {
    vote_start: Date;
    vote_end: Date;
}

interface VoteTimeState {
    value: VoteTime;
}

const initialState: VoteTimeState = {
    value: {
        vote_start: new Date(Date.parse('2024-04-22T13:39:00+02:00')),
        vote_end: new Date(Date.parse('2024-04-22T13:39:10+02:00'))
    }
}

const voteTimeSlice = createSlice({
    name: "votetime",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getVoteInterval.pending, () => {
                console.log("Request for interval is in progress");
            })
            .addCase(getVoteInterval.fulfilled, (state, action: PayloadAction<VoteTime>) => {
                console.log("megyen");
                console.log(state.value.vote_start);
                console.log(state.value.vote_end);
                console.log(action.payload);
                console.log("megyen2");
                state.value.vote_start = action.payload.vote_start;
                state.value.vote_end = action.payload.vote_end;
                console.log(state.value.vote_start);
                console.log(state.value.vote_end);
                console.log("megyen3");
            })
    }
})

export const getVoteInterval = createAsyncThunk(
    "getVoteTimeInterval",
    async () => {
        const response = await axios
            .get("http://worldtimeapi.org/api/timezone/Europe/Budapest");
        const start = new Date(Date.parse(response.data.datetime));
        const end = new Date(Date.parse(response.data.datetime));
        start.setMinutes(40);
        end.setMinutes(45);
        return { vote_start: start, vote_end: end };
    }
)

export default voteTimeSlice.reducer;