import React, { ChangeEvent, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import json from "../../test_data/new_trash_count.json";
import styled from "styled-components";
import { Container } from "../../style/Layout";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
type Trash = "담배꽁초" | "일반담배꽁초" | "일반쓰레기" | "재활용쓰레기" | "항아리형";
interface TrashCount {
  [key: string]: Record<Trash, number>;
}
interface Data {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
  ];
}

export default function BarChart() {
  const [trash, setTrash] = useState<TrashCount>(json);
  const [labels, setLabels] = useState(Object.keys(trash));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.currentTarget;
    // console.log(checked, id);
    if (checked === true) {
      setLabels([...labels, id].sort());
      labels.push(id);
    } else {
      const newLabels = labels.filter(label => label !== id).sort();
      setLabels(newLabels);
    }
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "서울시 자치구별 쓰레기통 현황",
      },
      legend: {
        position: "top" as const,
      },
    },
    responsive: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
      },
    },
  };

  const data: Data = {
    labels,
    datasets: [
      {
        label: "일반쓰레기",
        data: labels.map(label => trash[label].일반쓰레기),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "재활용",
        data: labels.map(label => trash[label].재활용쓰레기),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "담배꽁초",
        data: labels.map(i => trash[i].담배꽁초),
        backgroundColor: "rgba(53, 235, 68, 0.5)",
      },
      {
        label: "항아리형",
        data: labels.map(i => trash[i].항아리형),
        backgroundColor: "rgba(229, 190, 72, 0.5)",
      },
      {
        label: "일반+담배꽁초",
        data: labels.map(i => trash[i].일반담배꽁초),
        backgroundColor: "rgba(171, 72, 229, 0.5)",
      },
    ],
  };
  return (
    <>
      <Bar options={options} data={data} width={800} height={500} />
      <ChartContainer>
        {Object.keys(trash).map(label => (
          <label>
            <input
              id={label}
              type="checkbox"
              name="color"
              checked={labels.includes(label) || false}
              onChange={handleChange}
            />{" "}
            {label}
          </label>
        ))}
      </ChartContainer>
    </>
  );
}

const ChartContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;
