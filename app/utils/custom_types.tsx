export type VoteTime = {
    vote_start: Date;
    setVoteStart: React.Dispatch<React.SetStateAction<Date>>;
    vote_end: Date;
    setVoteEnd: React.Dispatch<React.SetStateAction<Date>>;
}