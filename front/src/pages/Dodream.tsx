import { getDodream } from "@api/api";
import DodreamMap from "@components/DodreamMap";
import WalkTable from "@components/dodream/WalkTable";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

export default function Dodream() {
  const { isLoading, data: dodream } = useQuery(["dodream"], getDodream, {
    onSettled(data) {
      // console.log("11111111111111111", data);
    },
  });
  // console.log(isLoading);
  return (
    <>
      {isLoading ? (
        "로딩중입니다."
      ) : (
        <WalkWrap>
          <ChartBtn>차트로 보기</ChartBtn>
          <Title>서울시 산책로 현황</Title>
          <Input>
            <input placeholder="산책로를 검색해보세요!" />
            <button>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.5 0C4.71878 0 0 4.71878 0 10.5C0 16.2812 4.71878 21 10.5 21C13.122 21 15.5175 20.022 17.3613 18.4219L18 19.0605V21L27 30L30 27L21 18H19.0605L18.4219 17.3613C20.022 15.5175 21 13.122 21 10.5C21 4.71878 16.2812 0 10.5 0ZM10.5 3C14.6599 3 18 6.3401 18 10.5C18 14.6599 14.6599 18 10.5 18C6.3401 18 3 14.6599 3 10.5C3 6.3401 6.3401 3 10.5 3Z"
                  fill="#008037"
                />
              </svg>
            </button>
          </Input>
          <DataBox>
            <MapBox>
              <DodreamMap dodream={dodream} />
            </MapBox>
            <CourseBox>
              <WalkTable dodream={dodream} />
            </CourseBox>
          </DataBox>
        </WalkWrap>
      )}
    </>
  );
}
const WalkWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: hidden;
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

const Input = styled.label`
  position: relative;
  margin-top: 3.5em;

  input {
    padding: 0 15px;
    width: 360px;
    height: 50px;
    border-radius: 5px;
    font-size: 20px;
    ::placeholder {
      font-weight: 400;
      line-height: 24px;
      display: flex;
      align-items: flex-end;
      color: #b9c6cb;
    }
  }
  button {
    background-color: transparent;
    position: absolute;
    top: -10px;
    right: 5px;
    &:hover {
      background-color: transparent;
      transform: scale(1.1);
    }
  }
`;
const DataBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4.5em;
`;

const MapBox = styled.div`
  width: 500px;
  height: 500px;
  background-color: #008037;
  margin: 10px;
`;

const CourseBox = styled(MapBox)`
  width: 860px;
  height: 430px;
  background-color: #2a9c6b;
`;
