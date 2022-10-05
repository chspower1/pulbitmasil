import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AAtom } from "@atom/atom";
import LineChart from "@components/LineChart";
import BarChart from "@components/BarChart";
import { getInfo } from "@api/api";
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
