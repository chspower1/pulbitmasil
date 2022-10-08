import styled from "styled-components";

export default function Home() {
  return (
    <WalkWrap>
      <ChartBtn>차트로 보기</ChartBtn>
      <Title>서울시 산책로 현황</Title>
      <Input />
      <div>Map</div>
    </WalkWrap>
  );
}
const WalkWrap = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-y: hidden;
  background-image: url('/assets/images/walk.jpg');
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

  color: #FFFFFF;

`;

const Title = styled.div`
  position: absolute;
width: 467px;
height: 71px;
left: 727px;
top: 177px;

font-family: 'SEBANG Gothic';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 71px;
/* identical to box height */

text-align: center;

color: #008037;
`

const Input = styled.input`
  position: absolute;
  width: 360px;
  height: 50px;
  left: 775px;
  top: 295px;

  border-radius: 5px;
`;