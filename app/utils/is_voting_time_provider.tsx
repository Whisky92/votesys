'use client'

import { ReactElement, useState } from "react";
import { votingTimeContext } from "./is_voting_time_context";
import { useContext } from "react";
import timeContext from "./time_context";

type ChildrenType = {
    currentDate: Date,
    children: React.ReactNode
}

export default function IsVotingTimeProvider({currentDate, children} : ChildrenType) {
    const {vote_start, vote_end} = useContext(timeContext);
    const isVotePossible = currentDate >= vote_start && currentDate <= vote_end;
    
    const [canVote, setCanVote] = useState<boolean | null>(isVotePossible);
    const [canSeeResults, setCanSeeResults] = useState<boolean | null>(currentDate > vote_end);
    return (
        <votingTimeContext.Provider value={{canVote, setCanVote, canSeeResults, setCanSeeResults}}>
            {children}
        </votingTimeContext.Provider>
    );
}