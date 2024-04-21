'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function TempComponent() {

    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    useEffect(() => {
          intervalIdRef.current = setInterval(() => {
              router.push("/timer");
          }, 500);
    
        return () => {
            clearInterval(intervalIdRef.current as NodeJS.Timeout);
        }
    });
    return (
        <section className="w-full flex flex-col pt-20">
        </section>
    )
}