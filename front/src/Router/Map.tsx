/*global kakao*/
import React, { useEffect } from "react";

const { kakao }: any = window;
export default function Map() {
  useEffect(() => {
    // const kakaoScript = document.createElement("script");
    // kakaoScript.type = "text/javascript";
    // kakaoScript.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7f37747bed7865d5f70064ffdc3978f1";
    // kakaoScript.async = true;
    // document.body.appendChild(kakaoScript);

    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </div>
  );
}
