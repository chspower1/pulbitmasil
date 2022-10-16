import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalWrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContainer = styled(motion.form)`
  position: relative;
  z-index: 1000;
  width: 600px;
  height: 570px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
`;
export const ModalTitle = styled.h1`
  margin-top: 70px;
  margin-bottom: 24px;
  font-size: 32px;
  color: ${props => props.theme.mainColor};
`;
export const Desc = styled.p`
  display: flex;
  font-size: 30px;
  color: ${props => props.theme.textColor};
  margin-bottom: 18px;
`;
export const Accent = styled.h1`
  color: ${props => props.theme.mainColor};
`;
export const BtnContainer = styled.div`
  display: flex;
  width: 230px;
  justify-content: space-between;
`;
