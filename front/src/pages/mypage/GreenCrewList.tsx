import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { UserGreenCrews } from "@type/user";
export default function GreenCrewList({ greenCrews }: { greenCrews: UserGreenCrews[] | undefined }) {
  return (
    <Container>
      {greenCrews?.map(greenCrew => (
        <Item>
          <ContentBox>
            <ItemTitle>{greenCrew?.title}</ItemTitle>
            <ItemDate>{greenCrew?.startAt}</ItemDate>
          </ContentBox>
          <DeleteBtn>
            <FontAwesomeIcon icon={faTrashCan} size="2xl" color="#E17055" />
          </DeleteBtn>
        </Item>
      ))}
    </Container>
  );
}
const Item = styled(Box)`
  width: 100%;
  justify-content: space-between;
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
const ItemDate = styled(ItemTitle)`
  font-size: 18px;
`;
const DeleteBtn = styled(Box)`
  width: 60px;
  height: 60px;
  border: solid 2px ${props => props.theme.dangerColor};
  border-radius: 5px;
`;
