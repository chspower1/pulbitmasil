/*global kakao*/
import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao }: any = window;
export default function Map() {
  useEffect(() => {
    // 지도생성
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    // 마커 생성하기
    var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667); // 표시 될 위치
    // 생성
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    //마커에 클릭 이번트 등록하기
    kakao.maps.event.addListener(marker, "click", function () {
      alert("gldd");
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </div>
  );
}
