import { getDodream } from "@api/dodream";
import DodreamMap from "@components/dodream/DodreamMap";
import WalkTable from "@components/dodream/WalkTable";
import DodreamDetalModal from "@components/modal/DodreamDetail";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IDodream } from "@type/dodream";
import { Container, Wrapper, Title } from "@style/Layout";
export default function Dodream() {
  const { data: dodream } = useQuery<IDodream[] | undefined>(["dodream"], getDodream);

  return (
    <WalkWrap>
      <DodreamTitle>서울시 산책로 현황</DodreamTitle>
      <MapContainer>
        <DodreamMap dodream={dodream!} />
      </MapContainer>
      <TableContainer>
        <CourseBox>
          <WalkTable dodream={dodream!} />
        </CourseBox>
      </TableContainer>
    </WalkWrap>
  );
}
const WalkWrap = styled(Wrapper)`
  background-image: url("/assets/images/walk.jpg");
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

// const ChartBtn = styled.button`
//   position: absolute;
//   width: 208px;
//   height: 73px;
//   left: 28px;
//   top: 117px;
//   background: #008037;
//   border-radius: 5px;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 28px;
//   text-align: center;
// `;

const DodreamTitle = styled(Title)`
  text-align: center;
  color: #008037;
  margin-top: 2%;
`;

const CourseBox = styled.div`
  /* margin-top: 80px; */
  width: 860px;
  height: 200px;
  /* background-color: #2a9c6b; */
  border: none;
`;

const TableContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55%;
  height: 30vh;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  height: 40vh;
  /* background-color: #008037; */
  /* margin: 30px; */
  margin-top: 2%;
`;
