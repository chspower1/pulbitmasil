import React from "react";
import { useRecoilState } from "recoil";
import { AAtom } from "@atom/atom";
import LineChart from "@components/LineChart";
import BarChart from "@components/BarChart";
export default function Home() {
  const [a, setA] = useRecoilState(AAtom);

  const labels = ["January", "February", "March", "April", "May", "June"];
  const datas = [0, 10, 5, 2, 20, 30, 45];

  const linedata = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#d50000",
        borderColor: "#4a148c",
        data: datas,
      },
    ],
  };

  const bardata = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["#ffcdd2", "#fbe9e7", "#e8f5e9"],
        borderColor: "#4a148c",
        data: datas,
      },
    ],
  };

  // const options = {
  //   scaleShowLabelBackdrop: true,
  //   legend: {
  //     display: true,

  //     labels: {
  //       fontColor: "rgb(255, 255, 255)",
  //       fontSize: 16,
  //     },
  //   },
  // };

  return (
    <>
      <div style={{ height: "300vh" }}>Home</div>
    </>
  );
}
