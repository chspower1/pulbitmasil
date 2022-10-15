import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 70px;
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 32px;
  color: ${props => props.theme.mainColor};
`;
export const SubTitle = styled.h3`
  /* font-family: "SebangBold"; */
  font-size: 18px;
  color: ${props => props.theme.mainColor};
`;
export const Desc = styled.p`
  font-family: "Sebang";
  font-size: 16px;
  color: ${props => props.theme.textColor};
`;
export const GreenAccent = styled.span`
  font-family: "SebangBold";
  color: ${props => props.theme.mainColor};
`;
export const DangerAccent = styled(GreenAccent)`
  color: ${props => props.theme.dangerColor};
`;

export const AboutContent = styled.div`
  display: flex;
  width: 1024px;
  height: 670px;
`;
export const Row = styled.div<{ height?: string }>`
  display: flex;
  width: 100%;
  height: ${props => (props.height ? props.height : "auto")};
  align-items: center;
`;
