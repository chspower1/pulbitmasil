import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { getGreenCrews } from "@api/greenCrew";
import { useQuery } from "@tanstack/react-query";
import { IGreenCrew } from "@type/greenCrew";
export default function Home() {
  const { data: greenCrews } = useQuery<IGreenCrew[] | undefined>(["greenCrew"], getGreenCrews, {
    onSuccess(data) {
      console.log("mypage query 작동", data);
    },
  });
  return (
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
