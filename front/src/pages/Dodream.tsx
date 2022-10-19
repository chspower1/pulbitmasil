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
      <WalkContainer>
        <DodreamTitle>한 눈에 보는 서울시 산책로</DodreamTitle>
        <MapBox>
          <DodreamMap dodream={dodream!} />
        </MapBox>
        <TableBox>
          <WalkTable dodream={dodream!} />
        </TableBox>
      </WalkContainer>
    </WalkWrap>
  );
}
const WalkWrap = styled(Wrapper)`
  position: relative;
  background-image: url("/assets/images/walk.jpg");
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
const WalkContainer = styled(Container)`
  flex-direction: column;
`;
const DodreamTitle = styled(Title)`
  text-align: center;
  color: #008037;
  margin-bottom: 40px;
`;

const MapBox = styled(Box)`
  width: 70px;
  height: 40vh;
`;

const TableBox = styled(Box)`
  width: 750px;
  height: 20vh;
`;
