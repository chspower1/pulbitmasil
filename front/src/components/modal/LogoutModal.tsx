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
import { DangerAccent, MainBtn, DangerBtn } from "@style/Layout";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutModal({ setIsUserNav }: UserNavProps) {
  const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleClickLogout = () => {
    sessionStorage.removeItem("userToken");
    setIsUserNav(false);
    setIsLogoutModal(false);
    setUser(null);
    queryClient.removeQueries({ queryKey: ["user"] });
    navigate("/");
  };

  return (
    <AnimatePresence>
      {isLogoutModal && (
        <LogoutModalWrap>
          <LogoutModalContainer variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <LogoutDesc>
              <DangerAccent>로그아웃&nbsp; </DangerAccent>하시겠습니까?
            </LogoutDesc>
            <ModalBtnContainer>
              <DangerBtn style={{ marginRight: "10px" }} type="button" onClick={handleClickLogout}>
                로그아웃
              </DangerBtn>

              <MainBtn type="button" onClick={() => setIsLogoutModal(false)}>
                취소
              </MainBtn>
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
