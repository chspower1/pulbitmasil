import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import { UserReviews } from "@type/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { ContentBox, ItemDate, ItemTitle, List, Item as ItemGuide, changeDayForm } from "./Home";
import { useRecoilState } from "recoil";
import { ReviewDeleteIdAtom } from "@atom/atom";
import dayjs from "dayjs";

export default function ReviewList({ reviews }: { reviews: UserReviews[] | undefined }) {
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);
  return (
    <List>
      {reviews?.map(review => (
        <Item>
          <ContentBox>
            <ItemTitle>{review?.title}</ItemTitle>
            <Box>
              <ItemDate>{changeDayForm(review?.createAt)}</ItemDate>
            </Box>
          </ContentBox>
          <DeleteBtn onClick={() => setReviewDelId(13)}>
            <FontAwesomeIcon icon={faTrashCan} size="2xl" color="#E17055" />
          </DeleteBtn>
        </Item>
      ))}
    </List>
  );
}

const Item = styled(ItemGuide)`
  justify-content: space-between;
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
