/*global kakao*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import testPoints from "../../test_data/풀빛마실후보데이터/성공/개웅산 숲 산책길o.json";
import { IDodream } from "@type/dodream";

const { kakao }: any = window;

export default function GreenCrewMap({ dodream }: { dodream: IDodream[] }) {
  const courseName = [
    "독정천",
    "고덕산 자락길",
    "북서울꿈의숲 산책길",
    "우장산 공원 산책길",
    "낙성대 산책길",
    "성동 송정둑길",
    "개웅산 숲 산책길",
    "월계근린공원 산책길",
    "홍릉수목원길",
    "보라매공원 산책길",
    "매봉산 자락길",
    "반포천",
    "오동공원 산책길",
    "석촌호수 산책길",
    "달마을공원 산책길",
    "남산야외식물원 산책길",
    "진관공원 나들길",
    "인왕산 자락길",
    "숭례문구간",
  ];
  useEffect(() => {
    console.log(testPoints);
    // const points = dodream[0].cpi.map(cpi => new kakao.maps.LatLng(cpi.x, cpi.y));
    // const targetPoint = new kakao.maps.LatLng(dodream[0].cpi[0].x, dodream[0].cpi[0].y);
    const samplePoints = testPoints.test.map(i => new kakao.maps.LatLng(i.x, i.y));
    let mapContainer = document.getElementById("greenCrewMap"), // 지도를 표시할 div
      mapOption = {
        center: samplePoints[samplePoints.length / 2], // 지도의 중심좌표
        level: 6, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    let greenCrewMap = new kakao.maps.Map(mapContainer, mapOption);

    console.log(testPoints);
    let clickLine = new kakao.maps.Polyline({
      map: greenCrewMap, // 선을 표시할 지도입니다
      path: samplePoints, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "#ff0000", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
      strokeStyle: "dash", // 선의 스타일입니다
    });
    let distance = Math.round(clickLine.getLength());

    var distanceOverlay: any;
    let startwindow = new kakao.maps.InfoWindow({
      map: greenCrewMap, // 인포윈도우가 표시될 지도
      position: samplePoints[0],
      content: `<div style="width:150px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">시작</div>`,
    });
    let endowindow = new kakao.maps.InfoWindow({
      map: greenCrewMap, // 인포윈도우가 표시될 지도
      position: samplePoints[samplePoints.length - 1],
      content: `<div style="width:150px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">끝</div>`,
    });

    function showDistance(content: any, targetPoint: any) {
      if (distanceOverlay) {
        // 커스텀오버레이가 생성된 상태이면
        // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
        distanceOverlay.setPosition(targetPoint);
        distanceOverlay.setContent(content);
      } else {
        // 커스텀 오버레이가 생성되지 않은 상태이면

        // 커스텀 오버레이를 생성하고 지도에 표시합니다
        distanceOverlay = new kakao.maps.CustomOverlay({
          map: greenCrewMap, // 커스텀오버레이를 표시할 지도입니다
          content: content, // 커스텀오버레이에 표시할 내용입니다
          position: targetPoint, // 커스텀오버레이를 표시할 위치입니다.
          xAnchor: 0,
          yAnchor: 0,
          zIndex: 3,
        });
      }
    }
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
