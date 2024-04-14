'use client'

import { ReactElement, useEffect, useState } from "react";
import { votingTimeContext } from "./is_voting_time_context";
import { useContext } from "react";
import { timeContext } from "./time_context";
import { VoteTime } from "./custom_types";

type ChildrenType = {
    currentDate: Date,
    children: React.ReactNode
}

export default function IsVotingTimeProvider({currentDate, children} : ChildrenType) {
    const {vote_start, setVoteStart, vote_end, setVoteEnd} = useContext(timeContext);

    useEffect(() => {
        setVoteStart(new Date(Date.parse('2024-04-20T13:39:00+02:00')));
        setVoteEnd(new Date(Date.parse('2024-04-20T13:40:00+02:00')));
    }, [])
    
    console.log(vote_start);
    console.log(vote_end);
    const isVotePossible = currentDate >= vote_start && currentDate <= vote_end;
    const [canVote, setCanVote] = useState<boolean | null>(isVotePossible);
    const [canSeeResults, setCanSeeResults] = useState<boolean | null>(currentDate > vote_end);
    return (
        <votingTimeContext.Provider value={{canVote, setCanVote, canSeeResults, setCanSeeResults}}>
            {children}
        </votingTimeContext.Provider>
    );
}