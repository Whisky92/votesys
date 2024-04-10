'use client'

interface MyFormElements extends HTMLFormControlsCollection {
    joe_biden_radioBtn: HTMLInputElement
    donald_trump_radioBtn: HTMLInputElement
}

interface MyFormElements extends HTMLFormElement {
    readonly elements: MyFormElements
}

function sendVote(event: React.FormEvent<MyFormElements>) {
    event.preventDefault();
    console.log("ASD");
}

export default function MyForm() {
    return (
        <form onSubmit={sendVote} className="max-w-full w-full flex flex-col justify-center">
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