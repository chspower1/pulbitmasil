import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalWrap = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
export const ModalContainer = styled(motion.form)<{ width?: string; height?: string }>`
  position: relative;
  z-index: 1000;
  width: ${props => (props.width ? props.width : "600px")};
  height: ${props => (props.height ? props.height : "570px")};
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
`;
export const ModalTitle = styled.h1`
  margin-top: 70px;
  margin-bottom: 28px;
  font-size: 28px;
  color: ${props => props.theme.mainColor};

  @media screen and (max-width: 767px) {
    font-size: 22px;
  }
`;
export const ModalDesc = styled.p`
  display: flex;
  font-size: 24px;
  color: ${props => props.theme.textColor};
  margin-bottom: 18px;

  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
`;
export const ModalAccent = styled.h1`
  color: ${props => props.theme.mainColor};

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;
export const ModalBtnContainer = styled.div`
  display: flex;
  width: 230px;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    width: 210px;
    font-size: 16px;
  }
`;
export const Overlay = styled(motion.div)`
  z-index: 100;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
