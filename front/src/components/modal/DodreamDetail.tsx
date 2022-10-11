import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalVariant, Overlay, OverlayVariant } from "./LoginModal";
import { BtnContainer, Desc, ModalContainer, ModalWrap as LogoutModalWrap } from "@style/ModalStyle";
import { isDodreamDetalModalAtom, selectedDodreamAtom } from "@atom/dodream";

export default function DodreamDetalModal() {
  const [isDodreamDetalModal, setIsDodreamDetalModal] = useRecoilState(isDodreamDetalModalAtom);
  const [selectedDodream, setSelectedDodream] = useRecoilState(selectedDodreamAtom);
  const handleClickLogout = () => {
    setIsDodreamDetalModal(false);
  };

  return (
    <AnimatePresence>
      {isDodreamDetalModal && (
        <LogoutModalWrap>
          <LogoutModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <LogoutDesc>
              <Accent>{selectedDodream?.course_name}</Accent>
            </LogoutDesc>
            <BtnContainer>
              <CloseBtn type="button" onClick={() => setIsDodreamDetalModal(false)}>
                취소
              </CloseBtn>
            </BtnContainer>
          </LogoutModalContainer>
          <Overlay
            onClick={() => setIsDodreamDetalModal(false)}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </LogoutModalWrap>
      )}
    </AnimatePresence>
  );
}
const LogoutModalContainer = styled(ModalContainer)`
  z-index: 10000;
  position: absolute;
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoutDesc = styled(Desc)`
  margin-top: 60px;
  margin-bottom: 40px;
`;

const LogoutBtn = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 22px;
  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: #cc5e43;
  }
`;
const Accent = styled.h1`
  color: ${props => props.theme.dangerColor};
`;
const CloseBtn = styled(LogoutBtn)`
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
`;
