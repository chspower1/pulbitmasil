import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { userAtom } from "@atom/user";
import { isLoginModalAtom, isLogoutModalAtom } from "@atom/atom";
import { UserNavProps } from "./layout/Nav";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";

export default function UserNav({ setIsUserNav }: UserNavProps) {
  const userNavMenus = ["userInfo", "myGreenStroll", "logout"];
  const userNavKorMenus = ["로그인", "회원가입"];
  const setIsLoginModalAtom = useSetRecoilState(isLoginModalAtom);
  const { pathname } = useLocation();
  const handleClickLogin = async () => {
    setIsLoginModalAtom(true);
    setIsUserNav(false);
  };
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  return (
    <AnimatePresence>
      <UserNavWrapper variants={variants} initial="hidden" animate="visible">
        <Button onClick={handleClickLogin}>
          <BtnText variants={item}>로그인</BtnText>
        </Button>

        <Link to="/register">
          <Button onClick={() => setIsUserNav(false)}>
            <BtnText variants={item}>회원가입</BtnText>
          </Button>
        </Link>
      </UserNavWrapper>
    </AnimatePresence>
  );
}

const UserNavWrapper = styled(motion.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: 70px;
  background: white;
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Button = styled.button`
  min-width: 180px;
  &:not(last-child) {
    border-bottom: solid 1px ${props => props.theme.accentColor};
  }
`;
const BtnText = styled(motion.p)``;
