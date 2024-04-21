import { createContext } from "react";

type isVotingTimeType = {
    canVote: boolean | null;
    setCanVote: React.Dispatch<React.SetStateAction<boolean | null>>;
    canSeeResults: boolean | null;
    setCanSeeResults: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const isVotingTimeState = {
    canVote: false,
    setCanVote: () => false,
    canSeeResults: false,
    setCanSeeResults: () => false
}

export const votingTimeContext = createContext<isVotingTimeType>(isVotingTimeState);
