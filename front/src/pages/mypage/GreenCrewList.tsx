import React, { useEffect, useState } from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { UserGreenCrew } from "@type/user";
import {
  List,
  Item,
  ContentBox,
  ItemTitle,
  ItemDate,
  ItemCourse,
  changeDayForm,
  HomeContainer,
  GrayTitle,
  HomeWrap,
  HeaderBox,
} from "./Home";
import dayjs from "dayjs";
export default function GreenCrewList({ greenCrews }: { greenCrews: UserGreenCrew[] | undefined }) {
  const [inProgressGreenCrew, setInProgressGreenCrew] = useState<UserGreenCrew[] | undefined>();
  const [doneGreenCrew, setDoneProgressGreenCrew] = useState<UserGreenCrew[] | undefined>();

  // Util
  const checkInProgress = (greenCrews: UserGreenCrew[]) => {
    setInProgressGreenCrew(greenCrews?.filter(greenCrew => greenCrew.inProgress! === 1));
    setDoneProgressGreenCrew(greenCrews?.filter(greenCrew => greenCrew.inProgress! === 0));
  };

  useEffect(() => {
    if (greenCrews) checkInProgress(greenCrews);
  }, []);
  return (
    <HomeWrap>
      <GrayTitle>
        <Title>완료</Title>
      </GrayTitle>
      <List>
        {doneGreenCrew?.map(greenCrew => (
          <Item>
            <HeaderBox>서북</HeaderBox>
            <ContentBox>
              <ItemTitle>{greenCrew?.title}</ItemTitle>
              <Box>
                <ItemDate>{changeDayForm(greenCrew?.startAt)}</ItemDate>
              </Box>
            </ContentBox>
          </Item>
        ))}
      </List>

      <GrayTitle>
        <Title>진행중</Title>
      </GrayTitle>
      <List>
        {inProgressGreenCrew?.map(greenCrew => (
          <Item>
            <HeaderBox>서북</HeaderBox>
            <ContentBox>
              <ItemTitle>{greenCrew?.title}</ItemTitle>
              <Box>
                <ItemDate>{changeDayForm(greenCrew?.startAt)}</ItemDate>
              </Box>
            </ContentBox>
          </Item>
        ))}
      </List>
    </HomeWrap>
  );
}

const ItemArea = styled(ItemTitle)`
  font-size: 18px;
`;
