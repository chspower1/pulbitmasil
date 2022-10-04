import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Title, PointElement, LineElement);

interface data {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: number[];
  }[];
}

const LineChart = ({ chartdata }: { chartdata: data }) => {
  console.log(chartdata);
  return (
    <Container>
      <Line data={chartdata} />
    </Container>
  );
};

export default LineChart;

const Container = styled.div`
  margin-top: 20px;
  width: 70vw;
  max-width: 500px;
`;
