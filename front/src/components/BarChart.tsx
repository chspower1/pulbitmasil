import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import json from "../test_data/trash_count.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const [trash, setTrash] = useState(json.data);
  console.log(trash);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const labels = ["강서구", "강남구", "March", "April", "May", "June", "July"];
  const data = {
    labels,
    datasets: [
      {
        label: "일반쓰레기",
        data: trash.map(i => i.category === "일반쓰레기" && i.count).filter(i => i),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "재활용",
        data: trash.map(i => i.category === "재활용쓰레기" && i.count).filter(i => i),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  console.log(trash.map(i => i.category === "일반쓰레기" && i.count));
  return <Bar options={options} data={data} />;
}
