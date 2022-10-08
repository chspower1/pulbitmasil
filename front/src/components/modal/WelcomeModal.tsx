import { isWelcomeModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalWrap, Overlay, OverlayVariant } from "./LoginModal";
export default function WelcomeModal() {
  const [isWelcomeModal, setIsWelcomeModal] = useRecoilState(isWelcomeModalAtom);
  const closeWelcomeModal = () => {};
  return (
    <AnimatePresence>
      {isWelcomeModal && (
        <WelcomeModalWrap>
          <Desc>
            환영합니다! 조호성님!
            <br />
            오늘 풀빛마실 어떠세요?
          </Desc>
          <Overlay
            onClick={() => closeWelcomeModal()}
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
  width: 500px;
  height: 200px;
`;
const Desc = styled.p`
  font-size: 30px;
`;
