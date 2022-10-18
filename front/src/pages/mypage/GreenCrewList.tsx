import React from "react";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { UserGreenCrews } from "@type/user";
import { List, Item, ContentBox, ItemTitle, ItemDate, ItemCourse, changeDayForm } from "./Home";
import dayjs from "dayjs";
export default function GreenCrewList({ greenCrews }: { greenCrews: UserGreenCrews[] | undefined }) {
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
