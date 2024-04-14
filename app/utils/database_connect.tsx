import { timeEnd } from "console";
import { VoteTime } from "./custom_types";
import axios from "axios";

export async function getVoteTime(){

    try {
//        return time.data;
    } catch (error) {
        return {
            vote_start: null,
            vote_end: null
        };
    }
}