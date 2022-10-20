import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { isLoginModalAtom, isLogoutModalAtom } from "@atom/atom";
import { UserIcon } from "./layout/Nav";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@type/user";
import { Box, Desc, Title as TitleGuide } from "@style/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faHouse, faImage, faRightFromBracket, faRoad, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Overlay } from "@style/ModalStyle";
import { OverlayVariant } from "@style/ModalVariants";

interface MenuNav {
  setIsMenuNav: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  isMenuNav: boolean;
  user: User | null;
}

export default function MenuNav({ setIsMenuNav, isLogin, isMenuNav, user }: MenuNav) {
  const setIsLoginModalAtom = useSetRecoilState(isLoginModalAtom);
  const setIsLogoutModalAtom = useSetRecoilState(isLogoutModalAtom);
  const handleClickLogin = async () => {
    setIsLoginModalAtom(true);
    setIsMenuNav(false);
  };
  return (
    <AnimatePresence>
      {isMenuNav && (
        <>
          <MenuNavWrapper
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 200 }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            <MenuProfileBox>
              <UserBox>
                <UserIcon style={{ margin: "0px" }}>
                  <FontAwesomeIcon icon={faUser} color="white" size="xl" />
                </UserIcon>
                <UserName>{user ? user.name : "Guest"}</UserName>
              </UserBox>
              <Desc>{user?.email}</Desc>
            </MenuProfileBox>
            <MenuList>
              <ItemBox onClick={() => setIsMenuNav(false)}>
                <Link to="/">
                  <Row>
                    <FontAwesomeIcon size="xl" icon={faHouse} />홈
                  </Row>
                </Link>
              </ItemBox>
              <ItemBox onClick={() => setIsMenuNav(false)}>
                <Link to="/about">
                  <Row>
                    <img src="/logo.png" alt="#" />
                    소개
                  </Row>
                </Link>
              </ItemBox>
              <ItemBox onClick={() => setIsMenuNav(false)}>
                <Link to="/dodream">
                  <Row>
                    <FontAwesomeIcon size="xl" icon={faRoad} />
                    산책로
                  </Row>
                </Link>
              </ItemBox>
              <ItemBox onClick={() => setIsMenuNav(false)}>
                <Link to="/greenCrew">
                  <Row>
                    <FontAwesomeIcon size="xl" icon={faUsers} />
                    모임
                  </Row>
                </Link>
              </ItemBox>
              <ItemBox onClick={() => setIsMenuNav(false)}>
                <Link to="/review">
                  <Row>
                    <FontAwesomeIcon size="xl" icon={faImage} />
                    후기
                  </Row>
                </Link>
              </ItemBox>
              {isLogin ? (
                <ItemBox
                  onClick={() => {
                    setIsMenuNav(false);
                    setIsLogoutModalAtom(true);
                  }}
                >
                  <Row>
                    <FontAwesomeIcon size="xl" icon={faRightFromBracket} />
                    로그아웃
                  </Row>
                </ItemBox>
              ) : (
                <ItemBox
                  onClick={() => {
                    setIsMenuNav(false);
                    setIsLoginModalAtom(true);
                  }}
                >
                  <Row>
                    <FontAwesomeIcon size="xl" icon={faDoorOpen} />
                    로그인
                  </Row>
                </ItemBox>
              )}
            </MenuList>
          </MenuNavWrapper>
          <Overlay
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setIsMenuNav(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
}

const MenuNavWrapper = styled(motion.div)`
  z-index: 10000;
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: 0px;
  height: 100vh;
  background: white;
  width: 200px;
  border-radius: 20px 0px 0px 20px;
  background-color: ${props => props.theme.mainColor};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
const MenuProfileBox = styled(motion.div)`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 30px;
  background-color: ${props => props.theme.borderColor};
  border-radius: 20px 0px 0px 0px;
`;
const UserBox = styled(Box)`
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const UserName = styled(TitleGuide)`
  margin-left: 6px;
  margin-bottom: 5px;
`;
const MenuList = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ItemBox = styled(motion.button)`
  height: 50px;
`;
const Row = styled(motion.div)`
  display: flex;
  width: 130px;
  height: 50px;
  color: white;
  align-items: center;
  justify-content: space-between;
`;
