import { useEffect, useState } from "react";
import { Box, Title, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { UserGreenCrew } from "@type/user";
import {
  List,
  Item,
  ContentBox,
  ItemTitle,
  ItemDate,
  ItemCourse,
  changeDayForm,
  GrayTitle,
  HomeWrap,
  HeaderBox,
  ListBox,
} from "./Home";

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
      {doneGreenCrew?.length! > 0 ? (
        <List>
          {doneGreenCrew?.map(greenCrew => (
            <Item>
              <HeaderBox>{greenCrew?.area}</HeaderBox>
              <ContentBox>
                <ListBox>
                  <ItemTitle>{greenCrew?.title}</ItemTitle>
                  <ItemCourse as="span">({greenCrew?.course})</ItemCourse>
                </ListBox>
                <Box>
                  <ItemDate>{changeDayForm(greenCrew?.startAt)}</ItemDate>
                </Box>
              </ContentBox>
            </Item>
          ))}
        </List>
      ) : (
        <SubTitle style={{ marginBottom: "20px" }}>참여한 모임이 없습니다.</SubTitle>
      )}

      <GrayTitle>
        <Title>진행중</Title>
      </GrayTitle>
      {inProgressGreenCrew?.length! > 0 ? (
        <List>
          {inProgressGreenCrew?.map(greenCrew => (
            <Item>
              <HeaderBox>서북</HeaderBox>
              <ContentBox>
                <ListBox>
                  <ItemTitle>{greenCrew?.title}</ItemTitle>
                  <ItemCourse as="span">({greenCrew?.course})</ItemCourse>
                </ListBox>
                <Box>
                  <ItemDate>{changeDayForm(greenCrew?.startAt)}</ItemDate>
                </Box>
              </ContentBox>
            </Item>
          ))}
        </List>
      ) : (
        <SubTitle style={{ marginBottom: "20px" }}>신청한 모임이 없습니다.</SubTitle>
      )}
    </HomeWrap>
  );
}

const ItemArea = styled(ItemTitle)`
  font-size: 18px;
`;
