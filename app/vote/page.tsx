'use client'

import MyForm from "@components/form";
import Voted from "@components/already_voted";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [requestFulfilled, setRequestFulfilled] = useState<boolean>(false);
    console.log("megyen: " + id);

    useEffect(() => {
    })

    return (
        <section className="w-3/4 max-w-full main_section">
            { true ? 
            (<MyForm id={id}/>) : 
            (<Voted />) }
        </section>
    );
}