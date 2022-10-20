import { isLoginModalAtom, isRegisterModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useSetRecoilState} from "recoil";
import styled from "styled-components";


import { ModalAccent, ModalDesc, ModalContainer, ModalWrap, Overlay } from "@style/ModalStyle";
import { ModalVariant, OverlayVariant } from "@style/ModalVariants";
import { CloseBtn } from "@style/Layout";
export default function RegisterModal() {
  const [isRegisterModal, setIsRegisterModal] = useRecoilState(isRegisterModalAtom);
  const  setIsLoginModal = useSetRecoilState(isLoginModalAtom);
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
            <ModalDesc>
              <ModalAccent>로그인</ModalAccent>&nbsp;이 필요해요.
            </ModalDesc>

            <StartBtn type="button" onClick={openLoginModal}>
              로그인 GOGO
            </StartBtn>

            <RegisterModalCloseBtn type="button" onClick={closeRegisterModal}>
              <svg width="14" height="14" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 3L11 11L3 19M3 3L19 19"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </RegisterModalCloseBtn>
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

const RegisterModalCloseBtn = styled(CloseBtn)`
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

  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
`;
