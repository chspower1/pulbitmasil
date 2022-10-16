import { isWelcomeModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { CloseBtn, ModalVariant, Overlay, OverlayVariant } from "./LoginModal";
import { Link } from "react-router-dom";
import { userAtom } from "@atom/user";
import { Accent, Desc, ModalContainer, ModalWrap } from "@style/ModalStyle";
export default function WelcomeModal() {
  const [isWelcomeModal, setIsWelcomeModal] = useRecoilState(isWelcomeModalAtom);
  const user = useRecoilValue(userAtom);
  const closeWelcomeModal = () => {
    setIsWelcomeModal(false);
  };
  return (
    <AnimatePresence>
      {isWelcomeModal && (
        <WelcomeModalWrap>
          <WelcomeModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <Desc>
              환영합니다&nbsp;!&nbsp;<Accent>{user?.name}</Accent>님&nbsp;!
            </Desc>
            <Desc>
              오늘&nbsp;<Accent>풀빛마실</Accent>&nbsp;어떠세요&nbsp;?
            </Desc>
            <Link to="/plogging">
              <StartBtn onClick={closeWelcomeModal}>풀빛마실 GoGo</StartBtn>
            </Link>
            <WelcomeCloseBtn type="button" onClick={closeWelcomeModal}>
              <svg width="14" height="14" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 3L11 11L3 19M3 3L19 19"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </WelcomeCloseBtn>
          </WelcomeModalContainer>
          <Overlay
            onClick={closeWelcomeModal}
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
const WelcomeModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
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
