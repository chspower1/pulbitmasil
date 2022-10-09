import { isLogoutModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { CloseBtn, LoginForm, ModalVariant, ModalWrap, Overlay, OverlayVariant } from "./LoginModal";
import { Link } from "react-router-dom";
import { userAtom } from "@atom/user";
import { UserNavProps } from "@components/layout/Nav";
import { createPortal } from "react-dom";

export default function LogoutModal({ setIsUserNav }: UserNavProps) {
  const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const handleClickLogout = () => {
    sessionStorage.removeItem("userToken");
    setIsUserNav(false);
    setIsLogoutModal(false);
    setUser(null);
  };

  return createPortal(
    <AnimatePresence>
      {isLogoutModal && (
        <WelcomeModalWrap>
          <WelcomeModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <TitleContainer>
              <Accent>로그아웃 </Accent>하시겠습니까?
            </TitleContainer>
            <BtnContainer>
              <Btn type="button" onClick={handleClickLogout}>
                네
              </Btn>
              <Btn type="button" onClick={() => setIsLogoutModal(false)}>
                아니요
              </Btn>
            </BtnContainer>
          </WelcomeModalContainer>
        </WelcomeModalWrap>
      )}
    </AnimatePresence>,
    document.getElementById("modal")!,
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
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;
const Desc = styled.p`
  display: flex;
  font-size: 30px;
  color: ${props => props.theme.textColor};
  margin-bottom: 18px;
`;
const Accent = styled.span`
  color: ${props => props.theme.dangerColor};
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
  font-size: 8px;
  width: 180px;
  height: 40px;
`;

const TitleContainer = styled.div`
  font-size: 32px;
`;

const BtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* &:first-child {
    color: ${props => props.theme.dangerColor};
  } */
`;

const Btn = styled(StartBtn)`
  font-size: 18px;
  margin-right: 10px;
`;
