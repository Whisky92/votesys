'use client';

import { updateTime } from "@app/utils/my_redux-store/slices/intervalSlice";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./timer";
import { RootState } from "@app/utils/my_redux-store/store";
import { changeCanSeeResults, changeCanVote } from "@app/utils/my_redux-store/slices/isVotingTimeSlice";

type propsType = {
    my_start_date: Date;
}

export default function TimerContainer({my_start_date}: propsType) {
    const vote_time = useSelector((state: RootState) => state.voteTime.value);
    const is_voting_time = useSelector((state: RootState) => state.isVotingTime.value);
    const [requestFulfilled, setRequestFulfilled] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!requestFulfilled) {
            axios.get("http://worldtimeapi.org/api/timezone/Europe/Budapest")
                .then((response) => {
                    const start = new Date(Date.parse(response.data.datetime));
                    const end = new Date(Date.parse(response.data.datetime));
                    start.setMinutes(1);
                    end.setMinutes(40);
                    const isVotePossible = my_start_date >= start && my_start_date <= end;
                    
                    dispatch(updateTime({ value: {
                        vote_start: start,
                        vote_end: end
                    }}))
                    dispatch(changeCanVote(isVotePossible));
                    dispatch(changeCanSeeResults(my_start_date > end));
                    setRequestFulfilled(true);
                })
        }
    });

    return (
        (requestFulfilled) ? 
    (
        <section className="w-full flex flex-col pt-20">
            <Timer start_date={ my_start_date }/>
        </section>
    ) :
    (
        <section className="w-full flex flex-col pt-20">
        </section>
    )
    )
}