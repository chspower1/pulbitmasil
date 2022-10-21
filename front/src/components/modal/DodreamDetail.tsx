import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalContainer, ModalWrap as DodreamModalWrap, Overlay } from "@style/ModalStyle";
import { isDodreamDetalModalAtom, selectedDodreamAtom } from "@atom/dodream";
import { OverlayVariant, ModalVariant } from "@style/ModalVariants";
import { CloseBtn } from "@style/Layout";

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
  const selectedDodream = useRecoilValue(selectedDodreamAtom);

  useEffect(() => {
    if (isDodreamDetalModal) {
      let detailMapContainer = document.getElementById("detailMap"), // 이미지 지도를 표시할 div
        detailMapOption = {
          center: new kakao.maps.LatLng(selectedDodream?.cpi[0].x, selectedDodream?.cpi[0].y), // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
          draggable: false,
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
        <DodreamModalWrap>
          <DodreamModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <CourseName>{selectedDodream?.course_name}</CourseName>
            <MapBox id="detailMap"></MapBox>
            <DescContainer>
              <Row style={{ marginTop: 20 }}>
                <Box>
                  <Title>길 종류 :</Title>
                  <Desc>{selectedDodream?.course_category_nm.split("/")[0]}</Desc>
                </Box>
                <Box>
                  <Title>자치구 :</Title>
                  <Desc>{selectedDodream?.area_gu}</Desc>
                </Box>
                <Box></Box>
              </Row>
              <Row style={{ marginBottom: 20 }}>
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
              <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </DodreamModalWrap>
      )}
    </AnimatePresence>
  );
}

const DodreamModalContainer = styled(ModalContainer)`
  z-index: 10000;
  position: fixed;
  width: 600px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 0px 150px; */
  @media screen and (max-width: 575px) {
    position: fixed;
    /* left: 0px; */
    width: 90vw;
    height: 90vh;
    right: 5%;
  }
`;
const CourseName = styled.h1`
  margin: 25px;
  font-size: 24px;
  color: ${props => props.theme.mainColor};
`;
const MapBox = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 5px;
  border: solid 5px ${props => props.theme.weekColor};
  @media screen and (max-width: 575px) {
    width: 85vw;
  }
`;
const DescContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 500px;
  @media screen and (max-width: 575px) {
    width: 85vw;
    align-items: center;
  }
`;
const Row = styled.div`
  display: flex;
  /* height: 60px; */
  @media screen and (max-width: 575px) {
    width: 90%;
  }
`;
const DetailRow = styled(Row)`
  justify-content: space-between;
  margin-bottom: 20px;
  @media screen and (max-width: 575px) {
    width: 95%;
    flex-direction: column;
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 180px;
  height: 40px;
  @media screen and (max-width: 575px) {
    width: 130px;
    flex-direction: column;
  }
`;
const Title = styled.div`
  color: ${props => props.theme.textColor};
  font-size: 16px;
`;
const BoldTitle = styled(Title)`
  font-family: "SebangBold";
  font-size: 16px;
  @media screen and (max-width: 575px) {
    margin-bottom: 3px;
  }
`;
const Desc = styled.h1`
  font-size: 18px;
  color: ${props => props.theme.mainColor};
  @media screen and (max-width: 575px) {
    font-size: 16px;
  }
`;
const LongDesc = styled(Title)`
  font-family: "SCDream";
  line-height: 1.5;
  width: 430px;
  height: 100px;
  overflow-y: scroll;
  text-overflow: ellipsis;
  border: solid 1px ${props => props.theme.weekColor};
  padding: 10px;
  font-size: 15px;
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`;
