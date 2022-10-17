import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { UserGreenCrews } from "@type/user";
const sample: UserGreenCrews[] = [
  { title: "풀빛마실", course: "우장산", startAt: "2022/10/17 7시", area: "강서구" },
  { title: "풀빛마실", course: "우장산", startAt: "2022/10/17 7시", area: "강서구" },
];
export default function GreenCrewList({ greenCrews }: { greenCrews: UserGreenCrews[] | undefined }) {
  return (
    <List>
      {sample?.map(greenCrew => (
        <Item>
          <ContentBox>
            <ItemTitle>
              {greenCrew?.title}
              <ItemCourse as="span">({greenCrew?.course})</ItemCourse>
            </ItemTitle>

            <Box>
              <ItemDate>{greenCrew?.startAt}</ItemDate>
              <ItemArea>{greenCrew?.area}</ItemArea>
            </Box>
          </ContentBox>
          <DeleteBtn>
            <FontAwesomeIcon icon={faTrashCan} size="2xl" color="#E17055" />
          </DeleteBtn>
        </Item>
      ))}
    </List>
  );
}
const List = styled(Container)`
  flex-direction: column;
`;
const Item = styled(Box)`
  width: 100%;
  justify-content: space-between;
  margin: 10px 0px;
  border-radius: 5px;
`;
const ContentBox = styled(Box)`
  width: 540px;
  height: 60px;
  padding: 0px 15px;
  justify-content: space-between;
  background-color: ${props => props.theme.weekBorderColor};
`;
const ItemTitle = styled(SubTitle)`
  font-size: 20px;
  color: ${props => props.theme.textColor};
`;
const ItemCourse = styled(SubTitle)`
  font-size: 16px;
  color: ${props => props.theme.mainColor};
`;
const ItemDate = styled(ItemTitle)`
  font-size: 16px;
  margin-right: 10px;
`;
const ItemArea = styled(ItemTitle)`
  font-size: 18px;
`;
const DeleteBtn = styled(Box)`
  width: 55px;
  height: 55px;
  border: solid 2px ${props => props.theme.dangerColor};
  border-radius: 5px;
`;
