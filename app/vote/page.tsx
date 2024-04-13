'use client'

import MyForm from "@components/form";
import Voted from "@components/already_voted";
import { useSearchParams } from "next/navigation";

export default function Home() {

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    console.log("megyen: " + id);


    return (
        <section className="w-3/4 max-w-full main_section">
            { true ? (<MyForm />) : 
            (<Voted />) }
        </section>
    );
}