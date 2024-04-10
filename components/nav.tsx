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

  function openForm(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (canVote) {
      router.push("/vote_id_field");
    } else {
      alert("The voting already ended or it has not started yet!");
    }
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
          <Link href="/">
            <p className="text-white text-xl font-bold italic">VoteSys</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="flex flex-row">
          <NavbarItem className="bg-white basis-1/2" />
          <NavbarItem className="basis-1/4">
            <button onClick={openForm} 
                    className="text-white text-xl font-bold">Vote</button>
          </NavbarItem>
          <NavbarItem className="basis-1/4">
            <button onClick={showResults}
                    className="text-white text-xl font-bold">Results</button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}