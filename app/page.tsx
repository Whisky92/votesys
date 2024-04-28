import TimerContainer from "@components/timer_container";

export default function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <TimerContainer my_start_date={new Date()}/>
    </section>
  );
}
