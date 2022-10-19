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
      <DodreamTitle>한 눈에 보는 서울시 산책로</DodreamTitle>
      <MapContainer>
        <DodreamMap dodream={dodream!} />
      </MapContainer>
      <TableContainer>
          <WalkTable dodream={dodream!} />
      </TableContainer>  
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


const DodreamTitle = styled(Title)`
  text-align: center;
  margin-top: 60px;
  color: #008037;
`;

const MapContainer = styled(Container)`
  width: 750px;
  height: 40vh;
`;

const TableContainer = styled(Container)`
  width: 750px;
  height: 20vh;
`;


