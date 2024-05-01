'use client'

import { RootState } from "@app/utils/my_redux-store/store"
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

interface MyFormElements extends HTMLFormControlsCollection {
    joe_biden_radioBtn: HTMLInputElement
    donald_trump_radioBtn: HTMLInputElement
}

interface MyFormElements extends HTMLFormElement {
    readonly elements: MyFormElements
}

type propsType = {
    id: string | null;
}

export default function MyForm({id}: propsType) {
    const is_voting_time = useSelector((state: RootState) => state.isVotingTime.value);
    const router = useRouter();

    type VoteType = {
        message: string;
        voter_id: string;
    }

    function sendVote(event: React.FormEvent<MyFormElements>) {
        event.preventDefault();

        const trumpSelected = event.currentTarget.elements.donald_trump_radioBtn.checked;
        const bidenSelected = event.currentTarget.elements.joe_biden_radioBtn.checked;
        if (trumpSelected || bidenSelected) {
            const selectedCandidate = trumpSelected ? "REP" : "DEM";

            axios.post<VoteType>("http://localhost:5000/vote/submit-vote", {
                message: selectedCandidate,
                voter_id: id
            })
                .then(() => {
                    router.push("/");
                })
                .catch(() => {
                    alert("An error has occured");
                })
        } else {
            alert("Select a candidate!");
        }
    }

    function votingTimeElapsed(event: React.FormEvent<MyFormElements>) {
        event.preventDefault();

        alert("Voting time has already elapsed");
        router.push("/");
    }
    
    return (
        <form onSubmit={is_voting_time.canVote ? sendVote : votingTimeElapsed} className="max-w-full w-full flex flex-col justify-center">
                <div className="w-full basis-1/2 flex flex-row">
                    <div className="basis-1/2 flex flex-col items-center">
                        <img
                            className="border-5 border-red-500 basis-3/4 candidate_img_div"
                            src="/images/biden.png"
                            alt="biden_image"
                            width={500}
                            height={500}
                        ></img>
                        <div className="flex flex-col items-center basis-1/4">
                            <label htmlFor="joe_biden_radioBtn" className="text-5xl">Joe Biden (DEM)</label>
                            <input type="radio" id="joe_biden_radioBtn" name="candidate" value="Joe Biden" className="w-8 h-8" />
                        </div>
                    </div>
                    <div className="basis-1/2 flex flex-col items-center">
                        <img
                            className="border-5 border-blue-500 basis-3/4 candidate_img_div"
                            src="/images/trump.png"
                            alt="trump_image"
                            width={500}
                            height={500}
                        ></img>
                        <div className="flex flex-col items-center basis-1/4">
                            <label htmlFor="donald_trump_radioBtn" className="text-5xl">Donald Trump Jr. (REP)</label> 
                            <input type="radio" id="donald_trump_radioBtn" name="candidate" value="Donald Trump" className="w-8 h-8"/>
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 flex justify-center items-top mt-10">
                    <button
                        type='submit'
                        className='bg-custom_blueberry my_submit_btn'
                    >
                        Submit
                    </button>
                </div>
            </form>
    );
}