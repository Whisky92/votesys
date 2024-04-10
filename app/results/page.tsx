'use client'

import { BarChart } from "@mui/x-charts";

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
    biden: 30,
    trump: 40,
    bar_title: 'Votes',
  }
];

export default function Home() {
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
  