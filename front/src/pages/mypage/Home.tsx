import { Box, Container, Title, SubTitle } from "@style/Layout";
import styled from "styled-components";
import { getSummaryGreenCrews } from "@api/greenCrew";
import { useQuery } from "@tanstack/react-query";
import { SummaryGreenCrew } from "@type/greenCrew";
import { User } from "@type/user";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export function changeDayForm(date: Date) {
  const formatDate = dayjs(date).format(`YYYY.MM.DD(dddd) A hh:mm`);
  console.log(new Date(date));
  console.log(formatDate);
  return formatDate.replace("요일", "");
}

export default function Home({ user }: { user: User }) {
  const { data: greenCrews } = useQuery<SummaryGreenCrew[] | undefined>(["summaryGreenCrew"], getSummaryGreenCrews);
  console.log(greenCrews?.map(i => i.startAt));
  return (
    <HomeWrap>
      <HomeContainer height="30%">
        <GrayTitle>
          <HomeRow>
            <Title>{user.name}</Title>님
          </HomeRow>{" "}
          <HomeRow>
            <Title>풀빛마실</Title>에&nbsp;
          </HomeRow>{" "}
          <HomeRow>
            <Title>{user.greenCrews?.length}회</Title> 참여하셨어요!
          </HomeRow>
        </GrayTitle>
      </HomeContainer>
      <HomeContainer className="content">
        <GrayTitle>
          현재 진행 중인 &nbsp;<Title>풀빛마실</Title>
        </GrayTitle>
        <List>
          {greenCrews?.map(greenCrew => (
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
      </HomeContainer>
    </HomeWrap>
  );
}
export const HomeWrap = styled(Box)`
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  padding: 30px 0px;
  padding-bottom: 0px;
  background-color: #f5f5f5;
  border-radius: 20px;
`;
export const HomeContainer = styled(Box)<{ height?: string }>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => (props.height ? props.height : "auto")};

  &.content {
    justify-content: flex-start;
    border-radius: 20px;
    background-color: #eeeeee;
  }
  @media screen and (max-width: 768px) {
    height: 20%;
  }
`;
export const List = styled(Container)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  padding: 0px 30px;
`;
export const GrayTitle = styled(Box)`
  font-size: 22px;
  color: ${props => props.theme.textColor};
  padding: 40px 0px;
  font-family: "SebangBold";

  @media screen and (max-width: 768px) {
    font-size: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
`;

export const Item = styled(Box)`
  width: 100%;
  height: 50px;
  justify-content: center;
  margin: 10px 0px;
  border: solid 1px #d9d9d9;
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;
export const HeaderBox = styled(Box)`
  background-color: ${props => props.theme.mainColor};
  color: white;
  width: 115px;
  height: 100%;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
export const ContentBox = styled(Box)`
  width: 100%;
  height: 50px;
  padding: 0px 15px;
  justify-content: space-between;
  border-radius: 5px;
  background: solid 1px ${props => props.theme.weekBorderColor};
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 5px;
    height: auto;
  }
`;
export const ItemTitle = styled(SubTitle)`
  font-size: 18px;
  color: ${props => props.theme.textColor};

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
export const ItemCourse = styled(SubTitle)`
  font-size: 16px;
  color: ${props => props.theme.mainColor};
`;
export const ItemDate = styled(ItemTitle)`
  font-size: 14px;
  margin-right: 10px;
`;

const HomeRow = styled(Box)`
  margin-bottom: 10px;
`;

export const ListBox = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 764px) {
    align-items: center;
    padding: 5px 0;
  }
`;
