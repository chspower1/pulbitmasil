import styled from "styled-components";
import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, Title, PointElement, LineElement);

// interface data {
//   labels: string[];
//   datasets: {
//     label: string;
//     backgroundColor: string;
//     borderColor: string;
//     data: number[];
//   }[];
// }

// const LineChart = ({ chartdata }: { chartdata: data }) => {
//   console.log(chartdata);
//   return (
//     <Container>
//       <Line data={chartdata} />
//     </Container>
//   );
// };

// export default LineChart;

// const Container = styled.div`
//   margin-top: 20px;
//   width: 70vw;
//   max-width: 500px;
// `;
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export const options = {
  responsive: false,
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

export function DoughnutChart() {
  return <Doughnut data={data} options={options} width={800} height={500} />;
}
