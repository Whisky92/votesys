'use client'

import { useEffect, useState } from "react";
import { votingTimeContext } from "./is_voting_time_context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../my_redux-store/store";
import { getVoteInterval } from "../my_redux-store/slices/intervalSlice";

type ChildrenType = {
    currentDate: Date,
    children: React.ReactNode
}

export default function IsVotingTimeProvider({currentDate, children} : ChildrenType) {

    const count = useSelector((state: RootState) => state.voteTime.value);
    const dispatch = useDispatch<AppDispatch>();

    const { vote_start, vote_end } = useSelector((state: RootState) => state.voteTime.value);


    useEffect(() => {
      dispatch(getVoteInterval());
    }, []);
    
    console.log("providerben vagyok");
    console.log(vote_start);
    console.log("providerben vagyok");


    const isVotePossible = currentDate >= vote_start && currentDate <= vote_end;
    const [canVote, setCanVote] = useState<boolean | null>(isVotePossible);
    const [canSeeResults, setCanSeeResults] = useState<boolean | null>(currentDate > vote_end);
    
    return (
        <votingTimeContext.Provider value={{canVote, setCanVote, canSeeResults, setCanSeeResults}}>
            {children}
        </votingTimeContext.Provider>
    );
}