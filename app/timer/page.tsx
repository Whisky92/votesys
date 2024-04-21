import Timer from "@components/timer";

export default function Home() {

    return (
        <section className='w-full flex-center flex-col'>
            <Timer start_date={ new Date() }/>
        </section>
    );
}