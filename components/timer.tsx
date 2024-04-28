'use client'

// used source: https://www.youtube.com/watch?v=jPo0mIcNZfM

import { useState, useEffect, useRef } from 'react';
import VoteField from './vote_id_field/vote_id_field';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/utils/my_redux-store/store';
import { changeCanSeeResults, changeCanVote } from '@app/utils/my_redux-store/slices/isVotingTimeSlice';

type propsType = {
    start_date: Date;
}

export default function Timer({start_date}: propsType) {
    
    const { vote_start, vote_end } = useSelector((state: RootState) => state.voteTime.value);
    const { canVote, canSeeResults } = useSelector((state: RootState) => state.isVotingTime.value);
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(
        start_date < vote_start ?
        vote_start.getTime() - start_date.getTime() :
        vote_end.getTime() - start_date.getTime()
    );
    const isStartPeriod = useRef<boolean>(start_date < vote_start ? true : false);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const election_title = document.getElementById('election_title');
        if (election_title) {
            if (isStartPeriod.current) {
                election_title.innerHTML = "Elections will begin in:";
            }
        }
 
        if (timeLeft >= 1000) {
            intervalIdRef.current = setInterval(() => {
                setTimeLeft(timeLeft - 1000);
            }, 1000);
        } else if (timeLeft < 1000 && isStartPeriod.current) {
            isStartPeriod.current = false;
            setTimeLeft(vote_end.getTime() - vote_start.getTime());
            if (!canVote) {
                dispatch(changeCanVote(true));
            }
        } else {
            if (canVote) {
                dispatch(changeCanVote(false));
            }
            if (!canSeeResults) {
                dispatch(changeCanSeeResults(true));
            }
        }

        return () => {
            clearInterval(intervalIdRef.current as NodeJS.Timeout);
        }
    });

    function getFormattedTime() {
        let current = timeLeft;

        console.log(current);
        let days = Math.floor(current / (1000 * 60 * 60 * 24));
        current = current - days * (1000 * 60 * 60 * 24);
        console.log(current);
        let hours = Math.floor(current / (1000 * 60 * 60) % 60);
        current = current - hours * (1000 * 60 * 60);
        console.log(current);
        let minutes = Math.floor(current / (1000 * 60) % 60);
        current = current - minutes * (1000 * 60);
        console.log(current);
        let seconds = Math.floor(current / 1000 % 60);
        console.log("asdd")

        let formattedDays = String(days).padStart(2, "0");
        let formattedHours = String(hours).padStart(2, "0");
        let formattedMinutes = String(minutes).padStart(2, "0");
        let formattedSeconds = String(seconds).padStart(2, "0");

        return (timeLeft > 0 && isStartPeriod.current) ? 
        `${formattedDays} days, ${formattedHours} hours, ${formattedMinutes} minutes, ${formattedSeconds} seconds` :
        "0 days, 0 hours, 0 minutes, 0 seconds";
    }

    return (
        (isStartPeriod.current) ? 
        (
            <section className="w-full flex flex-col pt-20">
                <div className="text-center text-5xl font-bold italic mt-20 mb-20" id="election_title"></div>
                <div className="text-center timer_div text-7xl italic">{getFormattedTime()}</div>
            </section> 
        ) : (canSeeResults) ? 
        (   
            <section className="w-full flex flex-col items-center justify-center h-screen">
                <div className="text-center text-7xl font-bold italic mt-20 mb-20">The voting has already ended</div>
            </section> 
        ) : (<VoteField />)
    );
}