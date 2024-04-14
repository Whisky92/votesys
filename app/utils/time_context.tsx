'use client'

import { createContext, use } from "react";
import { VoteTime } from "./custom_types";
import { useState, useEffect } from "react";
import axios from "axios";

export const timeContext = createContext<VoteTime>({
    vote_start: new Date(Date.parse('2024-04-13T13:39:00+02:00')),
    setVoteStart: () => new Date(),
    vote_end: new Date(Date.parse('2024-04-13T13:39:10+02:00')),
    setVoteEnd: () => new Date()
});

type ChildrenType = {
    children: React.ReactNode
}

export const TimeContextProvider = ({children} : ChildrenType) => {
    const [vote_start, setVoteStart] = useState<Date>(new Date(Date.parse('2024-04-15T13:39:00+02:00')));
    const [vote_end, setVoteEnd] = useState<Date>(new Date(Date.parse('2024-04-15T13:40:00+02:00')));

    return (
        <timeContext.Provider value={{vote_start, setVoteStart, vote_end, setVoteEnd}}>
            {children}
        </timeContext.Provider>
    );
}