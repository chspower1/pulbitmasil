import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import { UserReviews } from "@type/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { ContentBox, ItemDate, ItemTitle, List, Item as ItemGuide } from "./Home";
export default function ReviewList({ reviews }: { reviews: UserReviews[] | undefined }) {
  return (
    <List>
      {reviews?.map(review => (
        <Item>
          <ContentBox>
            <ItemTitle>{review?.title}</ItemTitle>
            <Box>
              <ItemDate>{review?.createAt}</ItemDate>
            </Box>
          </ContentBox>
          <DeleteBtn>
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
  border-radius: 5px;
`;
