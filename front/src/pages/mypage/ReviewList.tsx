import React from "react";
import { Box, Container, Title as TitleGuide, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import { UserReview } from "@type/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  ContentBox,
  ItemDate,
  ItemTitle,
  List,
  Item as ItemGuide,
  changeDayForm,
  HomeWrap,
  HomeContainer,
  GrayTitle,
  HeaderBox,
} from "./Home";
import { useRecoilState } from "recoil";
import { ReviewDeleteIdAtom } from "@atom/atom";
import dayjs from "dayjs";

export default function ReviewList({ reviews }: { reviews: UserReview[] | undefined }) {
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);
  return (
    <HomeWrap>
      <HomeContainer height="20%">
        <GrayTitle>
          <Title>나의 리뷰</Title>
        </GrayTitle>
      </HomeContainer>
      <ReviewContainer height="80%">
        <List>
          {reviews?.map(review => (
            <Item>
              <HeaderBox>서북</HeaderBox>
              <ContentBox>
                <ItemTitle>{review?.title}</ItemTitle>
                <Box>
                  <ItemDate>{changeDayForm(review?.createAt)}</ItemDate>
                </Box>
              </ContentBox>
            </Item>
          ))}
        </List>
      </ReviewContainer>
    </HomeWrap>
  );
}

const Item = styled(ItemGuide)`
  height: 50px;
  justify-content: space-between;
`;
const Title = styled(TitleGuide)`
  /* margin-bottom: 15px; */
`;
const ReviewContainer = styled(HomeContainer)`
  padding-top: 0px;
  justify-content: flex-start;
`;
const DeleteBtn = styled(Box)`
  width: 55px;
  height: 55px;
  border: solid 2px ${props => props.theme.dangerColor};
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.dangerColor};
  }
`;
