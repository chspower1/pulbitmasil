import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import LoginModal from "../modal/LoginModal";
import LogoutModal from "@components/modal/LogoutModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginModalAtom, isLogoutModalAtom } from "@atom/atom";
import { isLoginSelector } from "@atom/user";
import { logo01, logo02, logo03, logo04, logo05 } from "@style/icon/logo";
import { userAtom } from "@atom/user";
import UserNav from "@components/UserNav";
import DodreamDetalModal from "@components/modal/DodreamDetail";
// import ModalPortal from "@components/modal/ModalPortal";

// Interface
interface SearchForm {
  keyword: string;
}

export interface UserNavProps {
  setIsUserNav: React.Dispatch<React.SetStateAction<boolean>>;
}

// Variants
const LogoVariants = {
  initial: {
    fill: "rgba(0, 128, 55,0)",
  },
  animate: {
    fill: "rgba(0, 128, 55,1)",
    transition: {
      duration: 2,
    },
  },
};
const LogoPathVariants = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: {
      duration: 3,
    },
  },
};
const navVariants = {
  top: {
    backgroundColor: "rgba(255, 255, 255,1)",
  },
  scroll: {
    backgroundColor: "rgba(255, 255, 255,1)",
  },
};

export default function Nav() {
  const { pathname } = useLocation();
  const [refreshLogo, setRefreshLogo] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const isLogin = useRecoilValue(isLoginSelector);
  const [isLoginModal, setIsloginModal] = useRecoilState(isLoginModalAtom);
  // const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);

  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [curState, setCurState] = useState(pathname === "/" ? "home" : pathname.slice(1));
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const navMenus = ["home", "about", "dodream", "greencrew", "review"];
  const navKorMenus = ["홈", "소개", "산책로", "풀빛마실 모임", "후기"];
  const [isUserNav, setIsUserNav] = useState(false);

  //user nav 설정하는 코드
  const handleClickMenu = () => {
    // ModalPortal(LoginModal); 포탈적용 어떻게 해야할지 모르겠음
    isLogin ? setIsUserNav(cur => !cur) : setIsloginModal(cur => !cur);
  };
  const handleClickLogin = () => {
    setIsloginModal(true);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      // console.log(scrollY.get());
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, []);
  useEffect(() => {
    pathname === "/" ? setCurState("home") : setCurState(pathname.split("/")[1]);
    console.log("현재 pathname", pathname);
  }, [pathname]);
  return (
    <>
      <Wrap variants={navVariants} initial="top" animate={navAnimation}>
        <LogoBox>
          <Link to="/">
            <Logo
              key={refreshLogo}
              onClick={() => {
                setCurState("home");
                setRefreshLogo(prev => prev + 1);
              }}
              viewBox="0 0 180 47"
              xmlns="http://www.w3.org/2000/svg"
              variants={LogoVariants}
              initial="initial"
              animate="animate"
              stroke="#008037"
              strokeWidth="0.3"
              strokeLinecap="round"
            >
              <motion.path d={logo01} variants={LogoPathVariants} />
              <motion.path d={logo02} variants={LogoPathVariants} />
              <motion.path d={logo03} variants={LogoPathVariants} />
              <motion.path d={logo04} variants={LogoPathVariants} />
              <motion.path d={logo05} variants={LogoPathVariants} />
            </Logo>
          </Link>
        </LogoBox>
        <MenuBox>
          <Items>
            <AnimatePresence>
              {navMenus.map((menu, index) => (
                <Link key={index} to={menu === "home" ? "/" : menu}>
                  <Item onClick={() => setCurState(menu)}>
                    {navKorMenus[index]}
                    {curState === menu && <CurCircle layoutId="point" />}
                  </Item>
                </Link>
              ))}
            </AnimatePresence>
          </Items>
        </MenuBox>
        {isLogin || (
          <LoginContainer>
            <LoginBox>
              <LoginBtn onClick={handleClickLogin}>로그인</LoginBtn>
            </LoginBox>
            <Link to="/register">
              <RegisterBtn>회원가입</RegisterBtn>
            </Link>
          </LoginContainer>
        )}

        {isLogin && (
          <UserContainer>
            <img src="/assets/icon/user/user_img.svg" />
            <div>
              <UserName style={{ color: "green" }}>{user?.name}</UserName> 님
            </div>
            <MenuImg onClick={handleClickMenu} src="/assets/icon/user/menu_button.svg" />
          </UserContainer>
        )}
        <LoginModal></LoginModal>
        <DodreamDetalModal />
        {isUserNav && <UserNav setIsUserNav={setIsUserNav}></UserNav>}
        <LogoutModal setIsUserNav={setIsUserNav}></LogoutModal>
      </Wrap>
    </>
  );
}
const Wrap = styled(motion.nav)`
  z-index: 1000;
  display: flex;
  position: fixed;
  justify-content: space-between;
  top: 0px;
  font-size: 18px;
  height: 70px;
  width: 100%;
  padding-left: 20px;
  overflow: hidden;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const LogoBox = styled(Col)``;
const MenuBox = styled(Col)`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  width: 710px;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;
const UserBox = styled(Col)`
  flex-direction: column;
  justify-content: center;
  width: 70px;
  height: 70px;
  background-color: ${props => props.theme.accentColor};
  cursor: pointer;
`;
const Logo = styled(motion.svg)`
  width: 180px;
  height: 46px;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
  a:not(:last-of-type) {
    border-right: solid 1px gray;
  }
`;
const Item = styled.li`
  position: relative;
  width: 140px;
  display: flex;
  justify-content: center;

  color: #618872;
`;
const CurCircle = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  bottom: -20px;
  background-color: ${props => props.theme.accentColor};
`;

const LoginContainer = styled.div`
  width: 240px;
  height: 100%;
  display: flex;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  right: 20px;
`;

const LoginBox = styled.div`
  width: 105px;
  height: 40px;
  font-size: 18px;
  color: ${props => props.theme.mainColor};
  cursor: pointer;
  border-radius: 5px;
`;

const RegisterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 40px;
  background-color: ${props => props.theme.mainColor};
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin: auto;

  &:hover {
    background-color: ${props => props.theme.accentColor};
    color: white;
  }
`;

const LoginBtn = styled.button`
  width: 105px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  background-color: white;
  color: ${props => props.theme.mainColor};
  &:hover {
    color: white;
  }
`;

const RegisterBtn = styled.button`
  font-weight: bold;
  width: 105px;
  height: 40px;
  color: white;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
`;

const UserContainer = styled(LoginContainer)``;

const UserName = styled.span`
  color: ${props => props.theme.accentColor};
`;
const MenuImg = styled(motion.img)`
  cursor: pointer;
`;
