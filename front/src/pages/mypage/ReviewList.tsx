import { Box, Title as TitleGuide, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import { UserReview } from "@type/user";
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
  ListBox,
  ItemCourse,
} from "./Home";
import { useRecoilState } from "recoil";
import { ReviewDeleteIdAtom } from "@atom/atom";

export default function ReviewList({ reviews }: { reviews: UserReview[] | undefined }) {
  return (
    <HomeWrap>
      <HomeContainer height="20%">
        <GrayTitle>
          <Title>나의 리뷰</Title>
        </GrayTitle>
      </HomeContainer>
      <ReviewContainer height="80%">
        {reviews?.length! > 0 ? (
          <List>
            {reviews?.map(review => (
              <Item>
                <HeaderBox>서북</HeaderBox>
                <ContentBox>
                  <ListBox>
                    <ItemTitle>{review?.title}</ItemTitle>
                    {/* <ItemCourse as="span">({review?.})</ItemCourse> */}
                  </ListBox>
                  <Box>
                    <ItemDate>{changeDayForm(review?.createAt)}</ItemDate>
                  </Box>
                </ContentBox>
              </Item>
            ))}
          </List>
        ) : (
          <SubTitle style={{ marginBottom: "20px" }}>작성된 리뷰가 없습니다.</SubTitle>
        )}
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
