import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { isLoginSelector } from "@atom/user";
import { isLoginModalAtom } from "@atom/atom";
import { motion, AnimatePresence } from "framer-motion";
interface UserNavProps {
  setIsUserNav: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickLogout: () => Promise<void>;
  isUserNav: boolean;
}
export default function UserNav({ setIsUserNav, handleClickLogout, isUserNav }: UserNavProps) {
  const setIsLoginModalAtom = useSetRecoilState(isLoginModalAtom);
  const isLogin = useRecoilValue(isLoginSelector);
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
      {isUserNav &&
        (isLogin ? (
          <UserNavWrapper variants={variants} initial="hidden" animate="visible">
            <Link to="/mypage/home">
              <Button onClick={() => setIsUserNav(false)}>
                <BtnText variants={item}>마이페이지</BtnText>
              </Button>
            </Link>

            <Button onClick={handleClickLogout}>
              <BtnText variants={item}>로그아웃</BtnText>
            </Button>
          </UserNavWrapper>
        ) : (
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
        ))}
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
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const Button = styled.button`
  min-width: 180px;
  &:not(last-child) {
    border-bottom: solid 1px ${props => props.theme.accentColor};
  }
`;
const BtnText = styled(motion.p)``;
