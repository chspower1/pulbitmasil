/*global kakao*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { IDodream } from "@type/dodream";

const { kakao }: any = window;

export default function GreenCrewMap({ dodream }: { dodream: IDodream[] }) {
  useEffect(() => {
    console.log(dodream);
    let mapContainer = document.getElementById("greenCrewMap"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    let greenCrewMap = new kakao.maps.Map(mapContainer, mapOption);
  }, [dodream]);

  return (
    <>
      <MapBox id="greenCrewMap" />
    </>
  );
}
const MapBox = styled.div`
  width: 700px;
  height: 750px;
  border: 5px solid #88caae;
  border-radius: 10px;
`;
const DescBox = styled.div`
  width: 150px;
  text-align: center;
  padding: 8px;
  background-color: #2a9c6b;
  color: white;
`;
