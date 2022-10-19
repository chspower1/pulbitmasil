import { getDodream } from "@api/dodream";
import DodreamMap from "@components/dodream/DodreamMap";
import WalkTable from "@components/dodream/WalkTable";
import DodreamDetalModal from "@components/modal/DodreamDetail";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { IDodream } from "@type/dodream";
import { Container, Wrapper, Title, Box } from "@style/Layout";
export default function Dodream() {
  const { data: dodream } = useQuery<IDodream[] | undefined>(["dodream"], getDodream);

  return (
    <WalkWrap>
      <DodreamContainer>
        <DodreamTitle>한 눈에 보는 서울시 산책로</DodreamTitle>
        <MapBox>
          <DodreamMap dodream={dodream!} />
        </MapBox>
        <TableBox>
            <WalkTable dodream={dodream!} />
        </TableBox>
      </DodreamContainer>
    </WalkWrap>
  );
}
const WalkWrap = styled(Wrapper)`
  position: relative;
  background-image: url("/assets/images/walk.jpg");
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  /* padding-bottom: 40px; */
  @media screen and (max-width: 769px) {
    height: auto;
    overflow-y: auto;
  }
`;

const DodreamContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 40px;
`;

const DodreamTitle = styled(Title)`
  text-align: center;
  color: #008037;
`;

const MapBox = styled(Box)`
  width: 750px;
  height: 35vh;
  margin-top: 4vh;
  @media screen and (max-width: 769px) {
    width: 90%;
  }
`;

const TableBox = styled(Box)`
  margin-top: 3vh;
  width: 750px;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

