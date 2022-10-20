import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginModalAtom, isWelcomeModalAtom } from "@atom/atom";
import { isLoginSelector, isPasswordFindModalAtom } from "@atom/user";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { requestLogin } from "@api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { userAtom } from "@atom/user";
import NaverLoginBtn from "../NaverLoginBtn";
import { UserLoginForm } from "@type/user";
import { ModalWrap, ModalContainer as LoginForm, ModalTitle as LoginTitle, Overlay } from "@style/ModalStyle";
import { ModalVariant, OverlayVariant } from "@style/ModalVariants";
import { CloseBtn } from "@style/Layout";

export default function LoginModal() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UserLoginForm>({ mode: "onChange" });
  const [isLoginModal, setIsLoginModal] = useRecoilState(isLoginModalAtom);
  const isLogin = useRecoilValue(isLoginSelector);
  const setIsFindPassword = useSetRecoilState(isPasswordFindModalAtom);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const setIsWelcomeModal = useSetRecoilState(isWelcomeModalAtom);
  const handleClickViewPassword = () => {
    setIsViewPassword(cur => !cur);
  };
  const setUser = useSetRecoilState(userAtom);

  // 카카오 로그인
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleClickKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const closeLoginModal = async () => {
    setIsLoginModal(false);
    reset();
  };
  const handleClickFind = () => {
    setIsFindPassword(true);
    closeLoginModal();
  };
  // 로그인 버튼 클릭 시
  const onvalid = async (data: UserLoginForm) => {
    const { id, email, name, token, social, greenCrews, reviews } = await requestLogin(data);
    if (!email && !name && !token) {
      alert("로그인 정보가 틀렸습니다.");
      reset();
    } else {
      setIsWelcomeModal(true);
    }
    setUser({ id, email, name, token, social, greenCrews, reviews });
  };

  //로그인 시 모달비활성화,홈으로 이동
  useEffect(() => {
    if (isLogin) {
      closeLoginModal();
    }
  }, [isLogin]);
  return (
    <AnimatePresence>
      {isLoginModal && !isLogin && (
        <LoginModalWrap>
          <LoginFromWrap>
            <LoginForm
              onSubmit={handleSubmit(onvalid)}
              variants={ModalVariant}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoginTitle>로그인</LoginTitle>
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
                    onClick={handleClickViewPassword}
                  />
                </ViewPassword>
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </PasswordBox>
              <LoginBtn>로그인</LoginBtn>
              <UserBox>
                <Register onClick={() => closeLoginModal()}>
                  <Link to="/register">회원가입 </Link>
                </Register>

                <FindPassword onClick={handleClickFind}>비밀번호 찾기</FindPassword>
              </UserBox>
              <SocialLoginBox>
                <NaverLoginBtn />
                <KakaoLogin src="/assets/images/kakao_login_btn.png" onClick={handleClickKakao} />
              </SocialLoginBox>
              <CloseBtn type="button" onClick={() => closeLoginModal()}>
                <svg width="15" height="15" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              onClick={() => closeLoginModal()}
              variants={OverlayVariant}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </LoginFromWrap>
        </LoginModalWrap>
      )}
    </AnimatePresence>
  );
}

const LoginModalWrap = styled(ModalWrap)`
  width: 100%;
`;
const LoginFromWrap = styled(ModalWrap)`
  @media screen and (max-width: 767px) {
    position: fixed;
    width: 90%;
    left: 5%;
  }
`;

const EmailBox = styled.div`
  display: flex;
  width: 440px;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 90%;
  }
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
  @media screen and (max-width: 575px) {
    font-size: 16px;
  }
`;
const FindPassword = styled(Register)`
  border-left: solid 3px ${props => props.theme.weekColor};
  cursor: pointer;
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
  @media screen and (max-width: 1024px) {
    width: 100%;
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

export const ViewPassword = styled.div`
  position: absolute;
  height: 60px;
  right: 10px;
  display: flex;
  align-items: center;
`;

const LoginBtn = styled.button`
  width: 440px;
  height: 60px;
  font-size: 18px;
  font-family: "SebangBold";
  @media screen and (max-width: 767px) {
    width: 90%;
  }
`;
const SocialLoginBox = styled(UserBox)`
  justify-content: space-between;
`;

export const NaverLogin = styled.img`
  cursor: pointer;
  transition: all 0.4s ease;
  &:hover {
    filter: brightness(0.9);
  }
  @media screen and (max-width: 767px) {
    width: 49%;
  }
`;
export const KakaoLogin = styled(NaverLogin)``;
