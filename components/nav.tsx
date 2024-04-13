'use client'
// used source for popup: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_popup_form

import React, { MouseEvent, useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { votingTimeContext } from "@app/utils/is_voting_time_context";

export default function Nav() {
  let ids: Array<string>;
  const router = useRouter();
  const {canVote, setCanVote,
         canSeeResults, setCanSeeResults} = useContext(votingTimeContext);

  function onHomePress(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push("/");
  }

  function showResults(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (canSeeResults) {
      router.push("/results");
    } else {
      alert("The voting has not ended yet!");
    }
  }

  return (
    <>
      <Navbar className="w-full dark flex flex-row fixed top-0" maxWidth="full" isBlurred={false}>
        <NavbarBrand>
          <button onClick={onHomePress} 
                    className="text-white text-xl font-bold italic">VoteSys</button>
        </NavbarBrand>
        <NavbarContent className="flex flex-row">
          <NavbarItem className="bg-white basis-3/4" />
          <NavbarItem className="basis-1/4">
            <button onClick={showResults}
                    className="text-white text-xl font-bold">Results</button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}