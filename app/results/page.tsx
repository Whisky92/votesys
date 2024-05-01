'use client'

import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [requestPending, setRequestPending] = useState<boolean>(true);
  const bidenVotes = useRef<number>(0);
  const trumpVotes = useRef<number>(0);

  const chartSetting = {
    yAxis: [
      {
        label: 'Number of Votes',
      },
    ],
    width: 1000,
    height: 500,
  };
  
  const dataset = [
    {
      biden: bidenVotes.current,
      trump: trumpVotes.current,
      bar_title: 'Votes',
    }
  ];

  useEffect(() => {
    if (requestPending) {
      axios.get('http://localhost:5000/vote/get-votes')
        .then((response) => {
            bidenVotes.current = response.data.DEM == null ? 0 : response.data.DEM;
            trumpVotes.current = response.data.REP == null ? 0 : response.data.REP;
            setRequestPending(false);
        })
    }
  })

      return (
        <section className="w-3/4 max-w-full grid place-content-center bg-custom_gray main_section">
            <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'bar_title' }]}
                series={[
                    { dataKey: 'biden', label: 'Joe Biden'},
                    { dataKey: 'trump', label: 'Donald Trump'},
                ]}
                {...chartSetting}
            />
        </section>
    );
  }
  