import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import json from "../../test_data/new_dodream_count.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
type RoadObjectType = { [index: string]: number } ;

interface RoadCount {
  [key: string]: {
    생태문화길: any[] | null;
    서울둘레길: any[] | null;
    한강지천길_계절길: any[] | null;
    근교산자락길: any[] | null;
    한양도성길: any[] | null;
  };
}

interface Data {
  labels: string[]
  datasets: [
    {
      label: string;
      data: any[]
      backgroundColor: string;
    },
    {
      label: string;
      data: any[];
      backgroundColor: string;
    },
    {
      label: string;
      data: any[];
      backgroundColor: string;
    },
    {
      label: string;
      data: any[];
      backgroundColor: string;
    },
    {
      label: string;
      data: any[];
      backgroundColor: string;
    },
  ];
}

export default function RoadBarChart() {
  const [roads, setRoads] = useState<RoadCount>(json);
  console.log(roads);
  // const options = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: '서울시 도드람길 현황',
  //     },
  //     legend: {
  //       position: 'top' as const,
  //     },
  //   },
  //   responsive: false,
  //   scales: {
  //     x: {
  //       stacked: true,
  //       grid: {
  //         display: false
  //       }
  //     },
  //     y: {
  //       stacked: true,
  //       // grid: {
  //       //   display: false
  //       // }
  //     },
  //   },
  // };
  // const labels = Object.keys(roads);
  // // console.log(labels);
  // const data: Data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "생태문화길",
  //       data: labels.map(label => (roads[label].생태문화길).length),
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "서울둘레길",
  //       data: labels.map(label => roads[label].서울둘레길),
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //     {
  //       label: "한강지천길/계절길 ",
  //       data: labels.map(i => roads[i].한강지천길_계절길),
  //       backgroundColor: "rgba(53, 235, 68, 0.5)",
  //     },
  //     {
  //       label: "항아리형",
  //       data: labels.map(i => roads[i].근교산자락길),
  //       backgroundColor: "rgba(229, 190, 72, 0.5)",
  //     },
  //     {
  //       label: "일반+담배꽁초",
  //       data: labels.map(i => roads[i].한양도성길),
  //       backgroundColor: "rgba(72, 190, 229, 0.5)",
  //     },
  //   ],
  // };
  // return <Bar options={options} data={data} width={800} height={500}/>;
}
