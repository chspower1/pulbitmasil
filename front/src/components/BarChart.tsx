import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, Title, PointElement, BarElement);

interface data {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string[];
    borderColor: string;
    data: number[];
  }[];
}

const BarChart = ({ chartdata }: { chartdata: data }) => {
  console.log(chartdata);
  return (
    <Container>
      <Bar data={chartdata} />
      {/* <Bar data={} options={}/> */}
    </Container>
  );
};

export default BarChart;

const Container = styled.div`
  margin-top: 20px;
  width: 70vw;
  max-width: 500px;
`;
