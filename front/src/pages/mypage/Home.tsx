import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row, GreenAccent } from "@style/Layout";
import styled from "styled-components";
import { getGreenCrews } from "@api/greenCrew";
import { useQuery } from "@tanstack/react-query";
import { IGreenCrew } from "@type/greenCrew";
import { User } from "@type/user";
export default function Home({ user }: { user: User }) {
  const { data: greenCrews } = useQuery<IGreenCrew[] | undefined>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      console.log("mypage query 작동", data);
    },
  });
  return (
    <HomeWrap>
      <HomeContainer height="20%">
        <GrayTitle>
          <Title>{user.name}</Title>님 <Title>풀빛마실</Title>에<Title>{user.greenCrews?.length}회</Title> 참여하셨어요!
        </GrayTitle>
      </HomeContainer>
      <HomeContainer height="80%">
        <GrayTitle>
          현재 진행 중인 <Title>풀빛마실</Title>
        </GrayTitle>
        <List>
          {greenCrews?.map(greenCrew => (
            <Item>
              <ContentBox>
                <ItemTitle>
                  {greenCrew?.title}
                  <ItemCourse as="span">({greenCrew?.course})</ItemCourse>
                </ItemTitle>

                <Box>
                  <ItemDate>{String(greenCrew?.startAt)}</ItemDate>
                </Box>
              </ContentBox>
            </Item>
          ))}
        </List>
      </HomeContainer>
    </HomeWrap>
  );
}
const HomeWrap = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
`;
const HomeContainer = styled(Container)<{ height: string }>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => props.height};
`;
const List = styled(Container)`
  flex-direction: column;
`;
const GrayTitle = styled(Title)`
  font-size: 22px;
  color: ${props => props.theme.textColor};
`;

const Item = styled(Box)`
  width: 100%;
  justify-content: center;
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
