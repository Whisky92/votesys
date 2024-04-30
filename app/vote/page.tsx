'use client'

import MyForm from "@components/form";
import Voted from "@components/already_voted";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Home() {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [requestPending, setRequestPending] = useState<boolean>(true);
    const alreadyVoted = useRef<boolean>(false);

    useEffect(() => {
        if (requestPending) {
            axios.get(`http://localhost:5000/vote/hasVoted/${id}`)
            .then((response) => {
                const hasVoted = response.data;
                if (hasVoted == "True") {
                    alreadyVoted.current = true;
                }
                setRequestPending(false);
            })
        }
    })

    return (
        ( requestPending ) ? 
            (<section className="w-3/4 max-w-full main_section" />) :
            (alreadyVoted.current) ?
                (
                <section className="w-3/4 max-w-full main_section">
                    <Voted />
                </section>
                ) :
                (
                <section className="w-3/4 max-w-full main_section">
                    <MyForm id={id}/>
                </section>
                )
    );
}