import { isLogoutModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalBtnContainer, ModalDesc, ModalContainer, ModalWrap as LogoutModalWrap, Overlay } from "@style/ModalStyle";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "@atom/user";
import { UserNavProps } from "@components/layout/Nav";
import { createPortal } from "react-dom";
import { OverlayVariant, ModalVariant } from "@style/ModalVariants";

export default function LogoutModal({ setIsUserNav }: UserNavProps) {
  const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const handleClickLogout = () => {
    sessionStorage.removeItem("userToken");
    setIsUserNav(false);
    setIsLogoutModal(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AnimatePresence>
      {isLogoutModal && (
        <LogoutModalWrap>
          <LogoutModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <LogoutDesc>
              <Accent>로그아웃&nbsp; </Accent>하시겠습니까?
            </LogoutDesc>
            <ModalBtnContainer>
              <LogoutBtn type="button" onClick={handleClickLogout}>
                로그아웃
              </LogoutBtn>

              <CloseBtn type="button" onClick={() => setIsLogoutModal(false)}>
                취소
              </CloseBtn>
            </ModalBtnContainer>
          </LogoutModalContainer>
          <Overlay
            onClick={() => setIsLogoutModal(false)}
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
  width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogoutDesc = styled(ModalDesc)`
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
