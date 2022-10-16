import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CloseBtn, ModalVariant, Overlay, OverlayVariant } from "./LoginModal";
import { ModalContainer, ModalWrap as LogoutModalWrap } from "@style/ModalStyle";
import { isDodreamDetalModalAtom, selectedDodreamAtom } from "@atom/dodream";
import ReactMarkdown from "react-markdown";
const { kakao }: any = window;

export function convertTime(time: number) {
  const hour = `${String(time).split(".")[0]}시간` !== "0시간" ? `${String(time).split(".")[0]}시간` : "";
  const minute =
    `${parseInt(String(time).split(".")[1], 6) * 10}분` !== "NaN분"
      ? `${parseInt(String(time).split(".")[1], 6) * 10}분`
      : "";
  return `${hour} ${minute}`;
}

export default function DodreamDetalModal() {
  const [isDodreamDetalModal, setIsDodreamDetalModal] = useRecoilState(isDodreamDetalModalAtom);
  const [selectedDodream, setSelectedDodream] = useRecoilState(selectedDodreamAtom);

  useEffect(() => {
    if (isDodreamDetalModal) {
      let detailMapContainer = document.getElementById("detailMap"), // 이미지 지도를 표시할 div
        detailMapOption = {
          center: new kakao.maps.LatLng(selectedDodream?.cpi[0].x, selectedDodream?.cpi[0].y), // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
        };

      //  지도 생성
      let detailMap = new kakao.maps.Map(detailMapContainer, detailMapOption);

      // 코스 이름 메세지 설정
      let iwContent = `<div style="min-width:150px;max-width:400px;text-align:center;padding:8px;background-color:#2A9C6B;color:white;">${selectedDodream?.course_name}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      let iwPosition = new kakao.maps.LatLng(selectedDodream?.cpi[0].x! + 0.00035, selectedDodream?.cpi[0].y); //인포윈도우 표시 위치입니다
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
      let markerPosition = new kakao.maps.LatLng(selectedDodream?.cpi[0].x, selectedDodream?.cpi[0].y);

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
            <CourseName>{selectedDodream?.course_name}</CourseName>
            <MapBox id="detailMap"></MapBox>
            <DescContainer>
              <Row>
                <Box>
                  <Title>길 종류 :</Title>
                  <Desc>{selectedDodream?.course_category_nm.split("/")[0]}</Desc>
                </Box>
                <Box>
                  <Title>자치구 :</Title>
                  <Desc>{selectedDodream?.area_gu}</Desc>
                </Box>
              </Row>
              <Row>
                <Box>
                  <Title>거리 :</Title>
                  <Desc>{selectedDodream?.distance}</Desc>
                </Box>
                <Box>
                  <Title>소요시간 :</Title>
                  <Desc>{convertTime(selectedDodream?.lead_time!)}</Desc>
                </Box>
                <Box>
                  <Title>코스 레벨 :</Title>
                  <Desc>Level {selectedDodream?.course_level}</Desc>
                </Box>
              </Row>
              <DetailRow>
                <BoldTitle>교통편</BoldTitle>
                <LongDesc dangerouslySetInnerHTML={{ __html: `${selectedDodream?.traffic_info!}` }} />
              </DetailRow>
              <DetailRow>
                <BoldTitle>설명</BoldTitle>
                <LongDesc dangerouslySetInnerHTML={{ __html: `${selectedDodream?.content!}` }} />
              </DetailRow>
            </DescContainer>
            <CloseBtn type="button" onClick={() => setIsDodreamDetalModal(false)}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 3L11 11L3 19M3 3L19 19"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </CloseBtn>
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
  padding: 0px 150px;
`;
const CourseName = styled.h1`
  margin: 25px;
  font-size: 42px;
  color: ${props => props.theme.mainColor};
`;
const MapBox = styled.div`
  width: 700px;
  height: 350px;
  border-radius: 5px;
  border: solid 5px ${props => props.theme.weekColor};
`;
const DescContainer = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  /* height: 60px; */
`;
const DetailRow = styled(Row)`
  justify-content: space-between;
  margin-bottom: 40px;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 60px;
  margin-right: 30px;
`;
const Title = styled.div`
  color: ${props => props.theme.textColor};
  font-size: 18px;
`;
const BoldTitle = styled(Title)`
  font-family: "SebangBold";
`;
const Desc = styled.h1`
  font-size: 22px;
  color: ${props => props.theme.mainColor};
`;
const LongDesc = styled(Title)`
  line-height: 1.4;
  width: 630px;
  height: 130px;
  overflow: scroll;
  text-overflow: ellipsis;
  border: solid 1px ${props => props.theme.weekColor};
  padding: 10px;
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
