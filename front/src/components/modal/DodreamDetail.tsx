import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalVariant, Overlay, OverlayVariant } from "./LoginModal";
import { BtnContainer, Desc, ModalContainer, ModalWrap as LogoutModalWrap } from "@style/ModalStyle";
import { isDodreamDetalModalAtom, selectedDodreamAtom } from "@atom/dodream";

const { kakao }: any = window;

export default function DodreamDetalModal() {
  const [isDodreamDetalModal, setIsDodreamDetalModal] = useRecoilState(isDodreamDetalModalAtom);
  const [selectedDodream, setSelectedDodream] = useRecoilState(selectedDodreamAtom);
  useEffect(() => {
    if (isDodreamDetalModal) {
      let detailMapContainer = document.getElementById("detailMap"), // 이미지 지도를 표시할 div
        detailMapOption = {
          center: new kakao.maps.LatLng(selectedDodream?.x, selectedDodream?.y), // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
        };

      //  지도 생성
      let detailMap = new kakao.maps.Map(detailMapContainer, detailMapOption);

      // 코스 이름 메세지 설정
      let iwContent = `<div style="min-width:150px;max-width:400px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">${selectedDodream?.course_name}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      let iwPosition = new kakao.maps.LatLng(selectedDodream?.x! + 0.00035, selectedDodream?.y); //인포윈도우 표시 위치입니다
      var infowindow = new kakao.maps.InfoWindow({
        map: detailMap, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
      });

      // 마커 이미지
      let imageSrc = "/assets/icon/pointer.png";
      let imageSize = new kakao.maps.Size(30, 40);
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커 위치
      let markerPosition = new kakao.maps.LatLng(selectedDodream?.x, selectedDodream?.y);

      // 마커를 생성
      let marker = new kakao.maps.Marker({
        image: markerImage,
        position: markerPosition,
      });
      // 마커 지도 위 표시
      marker.setMap(detailMap);
    }
  }, [isDodreamDetalModal]);
  return (
    <AnimatePresence>
      {isDodreamDetalModal && (
        <LogoutModalWrap>
          <DodreamModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <div id="detailMap" style={{ width: "300px", height: "350px" }}></div>
            <DodreamDesc>
              <Accent>{selectedDodream?.course_name}</Accent>
            </DodreamDesc>
            <div>{selectedDodream?.course_category_nm}</div>
            <div>{selectedDodream?.area_gu}</div>
            <div>{selectedDodream?.distance}</div>
            <div>{selectedDodream?.lead_time}</div>
            <div>{selectedDodream?.course_level}</div>
            <div>{selectedDodream?.traffic_info}</div>
            <div>{selectedDodream?.content}</div>
            <BtnContainer>
              <CloseBtn type="button" onClick={() => setIsDodreamDetalModal(false)}>
                취소
              </CloseBtn>
            </BtnContainer>
          </DodreamModalContainer>
          <Overlay
            onClick={() => setIsDodreamDetalModal(false)}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </LogoutModalWrap>
      )}
    </AnimatePresence>
  );
}
const DodreamModalContainer = styled(ModalContainer)`
  z-index: 10000;
  position: absolute;
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DodreamDesc = styled(Desc)`
  margin-top: 60px;
  margin-bottom: 40px;
`;

const LogoutBtn = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 22px;
  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: #cc5e43;
  }
`;
const Accent = styled.h1`
  color: ${props => props.theme.dangerColor};
`;
const CloseBtn = styled(LogoutBtn)`
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
`;
