import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import LoginModal from "../modal/LoginModal";
import LogoutModal from "@components/modal/LogoutModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginModalAtom, isLoginSelector, isLogoutModalAtom } from "@atom/atom";
import { logo01, logo02, logo03, logo04, logo05 } from "@style/icon/logo";
import { userAtom } from "@atom/user";
import UserNav from "@components/UserNav";

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
  const [isLogoutModal, setIsLogoutModal] = useRecoilState(isLogoutModalAtom);
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [curState, setCurState] = useState(pathname === "/" ? "home" : pathname.slice(1));
  const { register, handleSubmit, reset } = useForm<SearchForm>();
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const navMenus = ["home", "about", "walking", "plogging", "review"];
  const navKorMenus = ["홈", "소개", "산책로", "풀빛마실 모임", "후기"];
  const userMenus = ["login", "register"];

  const [isUserNav, setIsUserNav] = useState(false);

  const handleClickLogout = async () => {
    isLogin && console.log("test: click logout");
    isLogin && setIsLogoutModal(true);
  };
  const handleClickUserBox = () => {
    isLogin ? setIsUserNav(cur => !cur) : setIsloginModal(cur => !cur);
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
    pathname === "/" ? setCurState("home") : setCurState(pathname.slice(1));
    console.log(pathname);
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
        <UserBox onClick={handleClickUserBox}>
          <svg width="40" height="40" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="45" height="45" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use href="#image0_5_230" transform="scale(0.0104167)" />
              </pattern>
              <image
                id="image0_5_230"
                width="96"
                height="96"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEHklEQVR4nO3czYscRRiA8afEkE2MSTwIGwRXIxuUmPixePAjEXPwYK6ioOA/IBo8BEVUVEQhiOjFb28SxbuCkES8JAcjroqiRtw1Kgme/NgJujk8HnoWJ4HNzvTMdNVk3h/saal+q953umeqq6shhBBCCCGEEEIIIYyLlLsD3VLXA7uBXcB1wBXAxva//wDmgVngEPBhSunvHP0876hb1HfUlt1rqW+r07n7P7LUNeqL6ukeEn+2RXWfOpF7PCNFnVa/7iPxZzuibso9rpGg3qD+PsDkL/lF3Z57fEWz+uQPI/mdRZjMPc4iqRPq7BCTv+Souib3eJdckLsDHZ6j+nk5bDPAYw3E6UoR8wB1C/ANcGFDIReA6ZTSyYbiLauUM+BRmks+wDrgqQbjLSv7GWA1wz0BrG04dAvYlHvGXMIZsJvmkw9wEXBXhrhnKKEAu8Y0NlBGAZr45bOc7BOzEgpwZcbYmzPGBsoowPqMsTdkjA2UUYCxVkIB/soY+8+MsYEyCjCXMfZPGWMDZRRgNmPsLzPGBsoowKGMsQ9mjA2UcStiHXCSambapBYwmVJaaDjuGbKfAe0EvJ8h9P7cyYcCzgCoVsKobkevaijkInBNSim+hAFSSseAlxsM+VIJyS9Ke0nySANLkofV1bnHWyR1Uj0+xOT/pl6We5xFU7dbPb0waMfVbbnHNxLUS9VPB5j8w8bjKL1RV6vPqAt9JP5f9Xnjml+f1ffCqz0WYkF9Q81+v38lRcwDumE1Y94N3AFcT7WQ0/l4+hzwBfAJ8FEJk6wQQgghhBBCCCGEEEI4U/ve/0712gZibVN3jP0agTqjPqkeVE+17+OfUC8fYswp9WQ71in1gPqEeuOwYhZF3ao+rX5/jsWUOfWqIcSeUo+dI+68+op6mzoy6yQrUi9RH1F/6HI1S/VX9ZYB9uHW9jG79Z26R9248tELpV5t9c6eXt7z02nRak249msF1LXqs9Z/5c2C+qbVRvLRoG6yWo/t5z0/nebVh6yWJLvtw8Xqw+rPA+rDafU1h/BkxcCudeoq4HFgL8N50rkFfAwcoNpTMEe1FgzV2vBmqh2Xd7b/hrH3uAXsA15IKZ0exAEHUgB1CtgPDOy6XbjPgPtSSj/2e6C+H85V7wW+YnySD3ATcFS9u98D9VUAdQ/wHnm3muayAfhAfbCfg9S+BKn3UG2sOH9+M9cj8EBK6d06jWslT90KfA6M93T+f/8AMymlb3ttWPcS9BaR/E4TwOt1GvZcAHUXcHOdYOe5HertvTaqcwbcX6PNuOg5N3UKsKNGm3Gxs9cGPX8Jqy3yvOFqFLRSSl3fMoF6BbDXNuMkpdRTTovYpjrOogCZRQEyiwJkFgXILAqQWRQgsyhAZlGAEEIIIYQQQgghhBAa8h8v/e80AMTCzAAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>
          <UserName>{isLogin ? user?.name : "손님"}</UserName>
        </UserBox>
        <LoginModal></LoginModal>
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
  font-size: 18px;
  height: 70px;
  width: 100%;
  padding-left: 20px;
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
const UserName = styled.div`
  font-size: 14px;
  color: white;
  margin-top: 5px;
`;
const LogoPath = styled(motion.path).attrs<{}>`
`;
const Logout = styled.button``;
