import { getDodream } from "@api/dodream";
import DodreamMap from "@components/dodream/DodreamMap";
import WalkTable from "@components/dodream/WalkTable";
import DodreamDetalModal from "@components/modal/DodreamDetail";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IDodream } from "@type/dodream";
import { Wrapper } from "@style/Layout";
export default function Dodream() {
  const { isLoading, data: dodream } = useQuery<IDodream[] | undefined>(["dodream"], getDodream);
  console.log(dodream);
  return (
    <>
      {isLoading ? (
        "로딩중입니다."
      ) : (
        <WalkWrap>
          <MapContainer>{/* <DodreamMap dodream={dodream!} /> */}</MapContainer>
          <RightContainer>
            {/* <ChartBtn>차트로 보기</ChartBtn> */}
            <Title>서울시 산책로 현황</Title>
            <CourseBox>
              <WalkTable dodream={dodream!} />
            </CourseBox>
          </RightContainer>
        </WalkWrap>
      )}
    </>
  );
}
const WalkWrap = styled(Wrapper)`
  background-image: url("/assets/images/walk.jpg");
`;

const ChartBtn = styled.button`
  position: absolute;
  width: 208px;
  height: 73px;
  left: 28px;
  top: 117px;
  background: #008037;
  border-radius: 5px;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 60px;
  line-height: 70px;
  padding-top: 100px;
  text-align: center;
  color: #008037;
`;

const CourseBox = styled.div`
  margin-top: 80px;
  width: 860px;
  height: 400px;
  /* background-color: #2a9c6b; */
  border: none;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-right: 60px;
  width: 55%;
  height: 100%;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45%;
  height: 100vh;
  /* background-color: #008037; */
  /* margin: 30px; */
  margin-top: 70px;
`;
