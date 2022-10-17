import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
export default function GreenCrewList(greenCrews: { greenCrews?: number[] }) {
  return (
    <Container>
      <Item>
        <ContentBox>
          <ItemTitle>저녁 풀빛마실</ItemTitle>
          <ItemDate>2022.10.17(수) PM07:00</ItemDate>
        </ContentBox>
        <DeleteBtn>
          <FontAwesomeIcon icon={faTrashCan} size="2xl" color="#E17055" />
        </DeleteBtn>
      </Item>
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
  font-size: 22px;
`;
const TrashIcon = styled.img`
  background-color: red;
`;
const ItemDate = styled(SubTitle)``;
const DeleteBtn = styled(Box)`
  width: 60px;
  height: 60px;
  border: solid 2px ${props => props.theme.dangerColor};
  border-radius: 5px;
`;
