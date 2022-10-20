import { getDodream } from "@api/dodream";
import DodreamMap from "@components/dodream/DodreamMap";
import WalkTable from "@components/dodream/WalkTable";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IDodream } from "@type/dodream";
import { Container, Wrapper, Title, Box, Desc, GreenAccent } from "@style/Layout";
import { faArrowPointer, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Dodream() {
  const { data: dodream } = useQuery<IDodream[] | undefined>(["dodream"], getDodream);

  return (
    <WalkWrap>
      <DodreamContainer>
        <DodreamTitle>한 눈에 보는 서울시 산책로</DodreamTitle>
        <MapBox>
          <ClickDesc>
            <FontAwesomeIcon icon={faArrowPointer} color="#008037" />
            &nbsp; 지도의 마커를 <GreenAccent>클릭</GreenAccent>해보세요!
          </ClickDesc>
          <DodreamMap dodream={dodream!} />
        </MapBox>
        <TableBox>
          <WalkTable dodream={dodream!} />
          <SortDesc>
            <FontAwesomeIcon icon={faSort} color="#008037" />
            &nbsp; 카테고리를 <GreenAccent>클릭</GreenAccent>해서 정렬해보세요!
          </SortDesc>
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
  overflow-y: scroll;
  @media screen and (max-width: 768px) {
    height: auto;
    overflow-y: auto;
  }
`;

const DodreamContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
`;

const DodreamTitle = styled(Title)`
  text-align: center;
  color: #008037;
`;
const ClickDesc = styled(Desc)`
  position: absolute;
  top: -20px;
  right: 0px;
`;
const SortDesc = styled(Desc)`
  position: absolute;
  bottom: -25px;
  right: 0px;
`;
const MapBox = styled(Box)`
  position: relative;
  width: 750px;
  height: 35vh;
  margin-top: 4vh;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const TableBox = styled(Box)`
  position: relative;
  margin-top: 3vh;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
