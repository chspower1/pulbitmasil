import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { curUserAtom, isLoginModalAtom, isLoginSelector } from "@atom/atom";
import { Link, useMatch, useNavigate } from "react-router-dom";

import { requestLogin } from "@api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faXing } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
interface LoginInfo {
  email: string;
  password: string;
  name?: string;
}
const ModalVariant = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
};
const OverlayVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function LoginModal() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginInfo>({ mode: "onChange" });
  const [isLoginModal, setIsLoginModal] = useRecoilState(isLoginModalAtom);
  const isLogin = useRecoilValue(isLoginSelector);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const navigator = useNavigate();
  const match = useMatch("/register");
  const onClickViewPassword = () => {
    setIsViewPassword(cur => !cur);
  };
  const [curUser, setCurUser] = useRecoilState(curUserAtom);
  //회원가입 페이지 이동시 모달창 꺼짐
  useEffect(() => {
    if (match) setIsLoginModal(prev => !prev);
  }, [match]);

  const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const onClickKakao = () => {
    // navigate(KAKAO_AUTH_URL);
    window.location.href = KAKAO_AUTH_URL;
  };

  const onvalid = async (data: LoginInfo) => {
    const { email, name, token } = await requestLogin(data);
    setCurUser({ email, name, token });
    console.log(curUser);
  };

  //로그인 시 모달비활성화,홈으로 이동
  useEffect(() => {
    if (isLogin) {
      setIsLoginModal(false);
      navigator("/");
    }
  }, [isLogin]);
  return (
    <Wrap>
      <AnimatePresence>
        <LoginForm
          onSubmit={handleSubmit(onvalid)}
          variants={ModalVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Title>로그인</Title>
          <EmailBox>
            <EmailInput
              id="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register("email", {
                required: "이메일을 입력해주세요!",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일 형식에 맞지 않습니다!",
                },
              })}
            />

            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </EmailBox>
          <PasswordBox>
            <PasswordInput
              id="password"
              type={isViewPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              {...register("password", {
                minLength: {
                  value: 7,
                  message: "7글자 이상 입력해주세요!",
                },
              })}
            />
            <ViewPassword>
              <FontAwesomeIcon
                icon={isViewPassword ? faEye : faEyeSlash}
                color="#2A9C6B"
                style={{ cursor: "pointer" }}
                onClick={onClickViewPassword}
              />
            </ViewPassword>

            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </PasswordBox>
          <LoginBtn>로그인</LoginBtn>
          <UserBox>
            <Register>
              <Link to="/register">회원가입 </Link>
            </Register>

            <FindPassword>
              <Link to="/register">아이디,비밀번호 찾기</Link>
            </FindPassword>
          </UserBox>
          <SocialLoginBox>
            <NaverLogin>네이버 로그인</NaverLogin>
            <KakaoLogin onClick={onClickKakao}>카카오 로그인</KakaoLogin>
          </SocialLoginBox>
          <CloseBtn onClick={() => setIsLoginModal(prev => !prev)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 3L11 11L3 19M3 3L19 19"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </CloseBtn>
        </LoginForm>
        <Overlay
          onClick={() => setIsLoginModal(prev => !prev)}
          variants={OverlayVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      </AnimatePresence>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginForm = styled(motion.form)`
  position: relative;
  z-index: 1000;
  width: 600px;
  height: 570px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
`;
const Title = styled.h1`
  margin-top: 70px;
  margin-bottom: 24px;
  font-size: 32px;
  color: ${props => props.theme.mainColor};
`;
const EmailBox = styled.div`
  display: flex;
  width: 440px;
  flex-direction: column;
  position: relative;
`;
const PasswordBox = styled(EmailBox)``;
const UserBox = styled(EmailBox)`
  height: 65px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.textColor};
`;
const Register = styled.div`
  width: 50%;
  text-align: center;
`;
const FindPassword = styled(Register)`
  border-left: solid 3px ${props => props.theme.weekColor};
`;
const Input = styled.input`
  width: 440px;
  height: 60px;
  font-size: 18px;
  margin-bottom: 34px;
  padding-left: 10px;
  color: ${props => props.theme.textColor};
  ::placeholder {
    color: ${props => props.theme.weekColor};
  }
`;
const EmailInput = styled(Input)``;
const PasswordInput = styled(Input)``;

const ErrorMessage = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${props => props.theme.dangerColor};
  height: 14px;
  bottom: 10px;
  right: 0;
`;

const ViewPassword = styled.div`
  position: absolute;
  height: 60px;
  right: 10px;
  display: flex;
  align-items: center;
`;
const Overlay = styled(motion.div)`
  z-index: 100;
  position: fixed;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  width: 44px;
  height: 44px;
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 10px;
`;
const LoginBtn = styled.button`
  width: 440px;
  height: 60px;
  font-size: 18px;
  font-family: "SebangBold";
`;
const SocialLoginBox = styled(UserBox)`
  justify-content: space-between;
`;
const NaverLogin = styled(LoginBtn)`
  width: 210px;
  border-radius: 5px;
  font-family: "Sebang";
  background-color: #03c75a;
`;
const KakaoLogin = styled(NaverLogin)`
  color: #402325;
  background-color: #ffe500;
  &:hover {
    background-color: #ebd832;
  }
`;
