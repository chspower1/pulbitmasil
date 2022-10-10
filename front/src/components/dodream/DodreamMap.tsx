/*global kakao*/
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import testDoream from "../../test_data/dodream.json";
const { kakao }: any = window;

interface NewDodream {
  course_category_nm: string;
  course_name: string;
  distance: string;
  area_gu: string;
  lead_time: string;
  course_level: string;
  x: number;
  y: number;
}

export default function DodreamMap({ dodream }: { dodream: any }) {
  const { data: test } = testDoream;
  const [newDodream, setNewDodream] = useState<NewDodream[] | null>([]);
  //카카오 지도
  useEffect(() => {
    // 두드림 정보 변환
    test.map((road: any) => {
      const nameArr = Object.keys(road.course_name) as any[];
      nameArr.map((name, index) => {
        // console.log(road.course_category_nm, index, name);
        const course_category_nm = road.course_category_nm;
        const course_name = name;
        const distance = road.course_name[name][0].distance;
        const area_gu = road.course_name[name][0].area_gu;
        const lead_time = road.course_name[name][0].lead_time;
        const course_level = road.course_name[name][0].course_level;
        const x = road.course_name[name][0].CPI[0].x;
        const y = road.course_name[name][0].CPI[0].y;
        const newRoad = { course_category_nm, course_name, distance, area_gu, lead_time, course_level, x, y };

        console.log(course_category_nm, course_name, distance, area_gu, lead_time, course_level, x, y);
        setNewDodream((prev: any) => {
          return [...prev, newRoad];
        });
      });
    });
    // console.log(newDodream[0].x, newDodream[0].y);

    // marker.setMap(map);
    // 여러개 마커 생성
    // for (let i = 0; i < markerPositions.length; i++) {
    //   let marker = new kakao.maps.Marker({
    //     map,
    //     position: markerPositions[i].lating,
    //     title: markerPositions[i].title,
    //   });
    //   marker.setMap(map);
    // }

    //마커에 클릭 이번트 등록하기
    // kakao.maps.event.addListener(marker, "click", function () {
    //   alert("gldd");
    // });

    //
  }, []);
  useEffect(() => {
    // 지도생성
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.5587081222, 127.1583825733),
      level: 7,
    };
    let map = new kakao.maps.Map(container, options);

    // 마커 생성하기
    let markerPosition = new kakao.maps.LatLng(37.5585362386, 127.1605311028); // 표시 될 위치
    let markerPositions = newDodream?.map(road => {
      console.log("-------------", road.x, road.y);
      return {
        title: road.course_name,
        content: road.course_name,
        latlng: new kakao.maps.LatLng(road.x, road.y),
      };
    });
    let imageSrc = "/assets/images/1.png";

    // 데이터 기반 마커 생성
    for (let i = 0; i < markerPositions!.length; i++) {
      let imageSize = new kakao.maps.Size(30, 40);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerPositions![i].latlng, // 마커를 표시할 위치
        title: markerPositions![i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      var infowindow = new kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">${
          markerPositions![i].content
        }</div>`, // 인포윈도우에 표시할 내용
      });
      kakao.maps.event.addListener(marker, "mouseover", makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, "mouseout", makeOutListener(infowindow));
    }
    function makeOverListener(map: any, marker: any, infowindow: any) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow: any) {
      return function () {
        infowindow.close();
      };
    }
  }, [newDodream]);

  return <MapBox id="map" />;
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
