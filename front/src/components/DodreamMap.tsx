/*global kakao*/
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import testDoream from "../test_data/dodream.json";
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
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    // 마커 생성하기
    let markerPosition = new kakao.maps.LatLng(37.5585362386, 127.1605311028); // 표시 될 위치
    let markerPositions = newDodream?.map(road => {
      console.log("-------------", road.x, road.y);
      return {
        title: road.course_name,
        latlng: new kakao.maps.LatLng(road.x, road.y),
      };
    });
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    for (let i = 0; i < markerPositions!.length; i++) {
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerPositions![i].latlng, // 마커를 표시할 위치
        title: markerPositions![i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }, [newDodream]);

  return (
    <div>
      <MapBox id="map"></MapBox>
    </div>
  );
}
const MapBox = styled.div`
  width: 700px;
  height: 800px;
  border: 5px solid #88caae;
  border-radius: 10px;
`;
