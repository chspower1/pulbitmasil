import json from "../../test_data/population.json";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { start } from "repl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Population {
  [key: string]: {
    "total": number,
    "average": number
  }
}

interface Data {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];

    },
  ]
}


export function PopulationChart() {
  const [population, setPopulation] = useState<Population>(json);

  const labels = ['2019', '2020', '2021', '2022'];

  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '전국 유동인구 연도별 주당 평균 변화량',
        padding: {bottom: 35},
        font: {
          size: 18
        }
      },
    },
    responsive: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: '연도',
          color: '#636E72',
        }
      },
      y: {
        stacked: true,
        min: 100,
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 8,

        },
        title: {
          display: true,
          text: '유동인구 변화량 (100만)',
          color: '#636E72',
        }
      },
    },
  };

  const data : Data = {
    labels,
    datasets: [
      {
        label: '유동인구량',
        data: labels.map(label => (population[label].average)/1000000),
        backgroundColor: ['#91DD9E', '#F7ACAC', '#A0C8EE', '#DAB4F1'],
      },
    ],
  };

  return <Bar options={options} data={data} width={500} height={400}/>;
}
