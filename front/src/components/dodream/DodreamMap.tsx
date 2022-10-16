/*global kakao*/
import LogoutModal from "@components/modal/LogoutModal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DodreamDetail from "@components/modal/DodreamDetail";
import { isDodreamDetalModalAtom, selectedDodreamAtom } from "@atom/dodream";
import { IDodream } from "@type/dodream";
import { useRecoilState } from "recoil";

const { kakao }: any = window;

export default function DodreamMap({ dodream }: { dodream: IDodream[] }) {
  const [isDodreamDetalModal, setIsDodreamDetalModal] = useRecoilState(isDodreamDetalModalAtom);
  const [selectedDodream, setSelectedDodream] = useRecoilState(selectedDodreamAtom);
  useEffect(() => {
    // 지도생성
    const xy = selectedDodream
      ? { x: selectedDodream.cpi[0].x, y: selectedDodream.cpi[0].y }
      : { x: 37.5585362386, y: 127.1605311028 };
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(xy.x, xy.y),
      level: selectedDodream ? 3 : 7,
    };
    let map = new kakao.maps.Map(container, options);

    // 마커 데이터 할당
    let markerPositions = dodream?.map(road => {
      // console.log("-------------", road.x, road.y);
      return {
        title: road.course_name,
        content: road.course_name,
        latlng: new kakao.maps.LatLng(road.cpi[0].x, road.cpi[0].y),
      };
    });
    // 마커 이미지
    let imageSrc = "/assets/icon/pointer.png";

    // 데이터 기반 마커 생성
    for (let i = 0; i < markerPositions!.length; i++) {
      let imageSize = new kakao.maps.Size(30, 40);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerPositions![i].latlng, // 마커를 표시할 위치
        title: markerPositions![i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      let infowindow = new kakao.maps.InfoWindow({
        // 인포윈도우에 표시할 내용
        content: `<div style="width:150px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">${
          markerPositions![i].content
        }</div>`,
      });

      // 맵 이동시 디폴트로 인포윈도우 띄우기
      if (selectedDodream) {
        let defaultInfowindow = new kakao.maps.InfoWindow({
          map: map, // 인포윈도우가 표시될 지도
          position: new kakao.maps.LatLng(xy.x + 0.00035, xy.y),
          content: `<div style="width:150px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">${selectedDodream?.course_name}</div>`,
        });
      }
      // 마커에 호버/클릭 이번트 등록하기
      kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
      kakao.maps.event.addListener(marker, "click", () => handleClickMarker(dodream[i]));

      // 마우스 호버 시 함수
      function makeOverListener(map: any, marker: any, infowindow: any) {
        return function () {
          infowindow.open(map, marker);
        };
      }

      // 마우스 리빙 시 함수
      function makeOutListener(infowindow: any) {
        return function () {
          infowindow.close();
        };
      }
      // 마우스 클릭 시 함수
      function handleClickMarker(dodream: IDodream) {
        console.log(dodream);
        setSelectedDodream(dodream);
        setIsDodreamDetalModal(true);
      }
    }
  }, [dodream, selectedDodream]);

  return (
    <>
      <MapBox id="map" />
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
