import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AAtom } from "@atom/atom";
import LineChart from "@components/chart/LineChart";
import BarChart from "@components/chart/BarChart";
import { getInfo } from "@api/api";
import { useNavigate } from "react-router-dom";
export default function Home() {
  useEffect(() => {
    const URL = {
      name: "trash",
    };
    getInfo(URL);
  }, []);
  return (
    <>
      <div style={{ height: "300vh" }}>
        Home<BarChart></BarChart>
      </div>
    </>
  );
}
