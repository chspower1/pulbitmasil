import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLogoutModalAtom, isLoginSelector } from "@atom/atom";
import { useEffect } from "react";

export default function LogoutModal() {
  const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);
  const isLogin = useRecoilValue(isLoginSelector);

  useEffect(() => {
    console.log("test : modal ");
  }, []);

  return <div>{isLogoutModal && <ModalWrap>hahahaha</ModalWrap>}</div>;
}

const ModalWrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
`;
