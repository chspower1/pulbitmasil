import { isLogoutModalAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalBtnContainer, ModalDesc, ModalContainer, ModalWrap as LogoutModalWrap, Overlay } from "@style/ModalStyle";
import { useNavigate } from "react-router-dom";
import { userAtom } from "@atom/user";
import { UserNavProps } from "@components/layout/Nav";
import { OverlayVariant, ModalVariant } from "@style/ModalVariants";
import { DangerAccent, MainBtn, DangerBtn } from "@style/Layout";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutModal({ setIsUserNav }: UserNavProps) {
  const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);
  const setUser = useSetRecoilState(userAtom);
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
              <DangerLogoutAccent>로그아웃&nbsp; </DangerLogoutAccent>하시겠습니까?
            </LogoutDesc>
            <ModalBtnContainer>
              <DangerLogoutBtn style={{ marginRight: "10px" }} type="button" onClick={handleClickLogout}>
                로그아웃
              </DangerLogoutBtn>

              <LogoutBtn type="button" onClick={() => setIsLogoutModal(false)}>
                취소
              </LogoutBtn>
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

  @media screen and (max-width: 768px) {
    width: 80%;
    position: fixed;
  }
`;
const LogoutDesc = styled(ModalDesc)`
  margin-top: 60px;
  margin-bottom: 40px;
`;

const LogoutBtn = styled(MainBtn)`
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
const DangerLogoutBtn = styled(DangerBtn)`
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
const DangerLogoutAccent = styled(DangerAccent)`
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
