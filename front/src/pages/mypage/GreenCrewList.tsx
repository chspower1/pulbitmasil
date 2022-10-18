import React, { useEffect, useState } from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { UserGreenCrew } from "@type/user";
import { List, Item, ContentBox, ItemTitle, ItemDate, ItemCourse, changeDayForm } from "./Home";
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
    <List>
      <Title>진행중</Title>
      {inProgressGreenCrew?.map(greenCrew => (
        <Item>
          <ContentBox>
            <ItemTitle>
              {greenCrew?.title}
              <ItemCourse as="span">({greenCrew?.course})</ItemCourse>
            </ItemTitle>
            <Box>
              <ItemDate>{changeDayForm(greenCrew?.startAt)}</ItemDate>
              <ItemArea>{greenCrew?.area}</ItemArea>
            </Box>
          </ContentBox>
        </Item>
      ))}
      <Title>완료</Title>
      {doneGreenCrew?.map(greenCrew => (
        <Item>
          <ContentBox>
            <ItemTitle>
              {greenCrew?.title}
              <ItemCourse as="span">({greenCrew?.course})</ItemCourse>
            </ItemTitle>
            <Box>
              <ItemDate>{changeDayForm(greenCrew?.startAt)}</ItemDate>
              <ItemArea>{greenCrew?.area}</ItemArea>
            </Box>
          </ContentBox>
        </Item>
      ))}
    </List>
  );
}

const ItemArea = styled(ItemTitle)`
  font-size: 18px;
`;
