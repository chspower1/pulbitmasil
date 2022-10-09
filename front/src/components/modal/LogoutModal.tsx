import { isLogoutModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { CloseBtn, LoginForm, ModalVariant, ModalWrap, Overlay, OverlayVariant } from "./LoginModal";
import { Link } from "react-router-dom";
import { userAtom } from "@atom/user";
export default function LogoutModal() {
  const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);
  const user = useRecoilValue(userAtom);
  const closeLogoutModal = () => {
    setIsLogoutModal(false);
  };
  return (
    <AnimatePresence>
      {isLogoutModal && (
        <WelcomeModalWrap>
          <WelcomeModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            sdadsadsad
          </WelcomeModalContainer>
          <Overlay
            onClick={closeLogoutModal}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </WelcomeModalWrap>
      )}
    </AnimatePresence>
  );
}
const WelcomeModalWrap = styled(ModalWrap)`
  z-index: 1000;
`;
const WelcomeModalContainer = styled(LoginForm)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
`;
const Desc = styled.p`
  display: flex;
  font-size: 30px;
  color: ${props => props.theme.textColor};
  margin-bottom: 18px;
`;
const Accent = styled.h1`
  color: ${props => props.theme.mainColor};
`;
const WelcomeCloseBtn = styled(CloseBtn)`
  width: 36px;
  height: 36px;
  top: 10px;
  right: 10px;
`;
const StartBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 22px;
  width: 180px;
  height: 40px;
`;
