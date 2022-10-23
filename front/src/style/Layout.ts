import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.section`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 70px;
  overflow: hidden;
  background-attachment: fixed;
  background-size: cover;
  background-color: ${props => props.theme.borderColor};
`;

export const Container = styled.div<{ width?: string }>`
  width: ${props => (props.width ? props.width : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0px;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.span`
  font-size: 32px;
  color: ${props => props.theme.mainColor};
  font-family: "SebangBold";

  @media screen and (max-width: 1024px) {
    font-size: 28px;
  }
  @media screen and (max-width: 728px) {
    font-size: 22px;
  }
`;
export const SubTitle = styled.h3`
  /* font-family: "SebangBold"; */
  font-size: 18px;
  color: ${props => props.theme.mainColor};

  @media screen and (max-width: 1024px) {
    font-size: 16px;
  }
  @media screen and (max-width: 728px) {
    font-size: 14px;
  }
`;
export const Desc = styled.p`
  font-family: "Sebang";
  font-size: 16px;
  line-height: 1.3;
  color: ${props => props.theme.textColor};
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 728px) {
    font-size: 14px;
  }
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

export const MainBtn = styled(motion.button)<{ width?: string; height?: string }>`
  width: ${props => (props.width ? props.width : "120px")};
  height: ${props => (props.height ? props.height : "45px")};
  border-radius: 5px;
  font-size: 18px;
  padding: ${props => props.width === "auto" && "0px 15px"};
  background-color: ${props => props.theme.mainColor};
  /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); // 나는 쉐도우 없는것도 괜찮은듯? */
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 15px;
  }
`;
export const DangerBtn = styled(MainBtn)<{ width?: string; height?: string }>`
  width: ${props => (props.width ? props.width : "120px")};
  height: ${props => (props.height ? props.height : "45px")};

  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: #cc5e43;
  }
`;
export const CloseBtn = styled(MainBtn)`
  position: absolute;
  width: 36px;
  height: 36px;
  top: 10px;
  right: 10px;
  padding: 0px;
`;
