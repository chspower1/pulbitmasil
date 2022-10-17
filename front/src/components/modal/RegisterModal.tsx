import { isLoginModalAtom, isRegisterModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userAtom } from "@atom/user";
import { Accent, Desc, ModalContainer, ModalWrap } from "@style/ModalStyle";
import { CloseBtn } from "@style/Modal";
import { ModalVariant, OverlayVariant } from "@style/ModalVariants";
export default function WelcomeModal() {
  const [isRegisterModal, setIsRegisterModal] = useRecoilState(isRegisterModalAtom);
  const [isLoginModal, setIsLoginModal] = useRecoilState(isLoginModalAtom);
  const openLoginModal = () => {
    setIsRegisterModal(false);
    setIsLoginModal(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModal(false);
  };
  return (
    <AnimatePresence>
      {isRegisterModal && (
        <RegisterModalWrap>
          <RegisterModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <Desc>
              <Accent>로그인</Accent>&nbsp;이 필요해요.
            </Desc>

            <StartBtn type="button" onClick={openLoginModal}>
              로그인 GOGO
            </StartBtn>

            <RegisterCloseBtn type="button" onClick={closeRegisterModal}>
              <svg width="14" height="14" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 3L11 11L3 19M3 3L19 19"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RegisterCloseBtn>
          </RegisterModalContainer>
          <Overlay
            onClick={closeRegisterModal}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </RegisterModalWrap>
      )}
    </AnimatePresence>
  );
}
const RegisterModalWrap = styled(ModalWrap)`
  z-index: 1000;
`;
const RegisterModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
`;

const RegisterCloseBtn = styled(CloseBtn)`
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
