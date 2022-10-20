/*global kakao*/

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import testPoints from "../../test_data/풀빛마실후보데이터/성공/상암산 DMC 체험나들길o.json";
import { IDodream } from "@type/dodream";
import { IGreenCrew } from "@type/greenCrew";

const { kakao }: any = window;

export default function GreenCrewMap({ greenCrew }: { greenCrew?: IGreenCrew }) {
  useEffect(() => {
    if (greenCrew) {
      // 좌표값 생성
      const points = greenCrew.CPI.map(i => new kakao.maps.LatLng(i.x, i.y));
      // 맵 정보
      let mapContainer = document.getElementById("greenCrewMap"), // 지도를 표시할 div
        mapOption = {
          center: points[0], // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
        };

      // 지도 생성
      let greenCrewMap = new kakao.maps.Map(mapContainer, mapOption);

      // 경로 생성
      let clickLine = new kakao.maps.Polyline({
        map: greenCrewMap, // 선을 표시할 지도입니다
        path: points, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
        strokeWeight: 5, // 선의 두께입니다
        strokeColor: "#00552d", // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
        strokeStyle: "dash", // 선의 스타일입니다
        endArrow: true,
        zIndex: 10,
      });
      let distance = Math.round(clickLine.getLength());

      var distanceOverlay: any;
      let startImageSrc = "/assets/icon/start_pointer.png";
      let endImageSrc = "/assets/icon/end_pointer.png";
      let imageSize = new kakao.maps.Size(40, 57);
      let startMarkerImage = new kakao.maps.MarkerImage(startImageSrc, imageSize);
      let endMarkerImage = new kakao.maps.MarkerImage(endImageSrc, imageSize);
      let markerStart = new kakao.maps.Marker({
        map: greenCrewMap, // 마커를 표시할 지도
        position: points[0], // 마커를 표시할 위치
        title: "시작점", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: startMarkerImage, // 마커 이미지
      });
      let markerEnd = new kakao.maps.Marker({
        map: greenCrewMap, // 마커를 표시할 지도
        position: points[points.length - 1], // 마커를 표시할 위치
        title: "끝", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: endMarkerImage, // 마커 이미지
      });
      // 좌표를 한눈에 보기
      var bounds = new kakao.maps.LatLngBounds();
      for (let i = 0; i < points.length; i++) {
        // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다

        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(points[i]);
      }
      greenCrewMap.setBounds(bounds);
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
    }
  }, [greenCrew]);

  return (
    <>
      <MapBox id="greenCrewMap" />
    </>
  );
}
const MapBox = styled.div`
  width: 350px;
  height: 340px;
  border: 5px solid ${props => props.theme.weekColor};
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const DescBox = styled.div`
  width: 150px;
  text-align: center;
  padding: 8px;
  background-color: ${props => props.theme.mainColor};
  color: white;
`;
