import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import { UserReviews } from "@type/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
const sample: UserReviews[] = [
  { title: "풀빛마실", description: "우장산", createAt: "2022/10/17 7시" },
  { title: "풀빛마실", description: "우장산", createAt: "2022/10/17 7시" },
];
export default function ReviewList({ reviews }: { reviews: UserReviews[] | undefined }) {
  return (
    <List>
      {sample?.map(greenCrew => (
        <Item>
          <ContentBox>
            <ItemTitle>{greenCrew?.title}</ItemTitle>

            <Box>
              <ItemDate>{greenCrew?.createAt}</ItemDate>
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
