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
      var staticMapContainer = document.getElementById("staticMap"), // 이미지 지도를 표시할 div
        staticMapOption = {
          center: new kakao.maps.LatLng(selectedDodream?.x, selectedDodream?.y), // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
        };

      // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
      var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
    }
  }, [isDodreamDetalModal]);
  return (
    <AnimatePresence>
      {isDodreamDetalModal && (
        <LogoutModalWrap>
          <DodreamModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <div id="staticMap" style={{ width: "300px", height: "350px" }}></div>
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
