import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "@atom/atom";
import { Link, useMatch } from "react-router-dom";
import { requestLogin } from "@api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
interface LoginInfo {
  email: string;
  password: string;
  name?: string;
}

export default function LoginModal() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginInfo>();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  const [isViewPassword, setIsViewPassword] = useState(false);
  const match = useMatch("/register");
  const onClickViewPassword = () => {
    setIsViewPassword(cur => !cur);
  };

  //회원가입 페이지 이동시 모달창 꺼짐
  useEffect(() => {
    if (match) setIsLogin(prev => !prev);
  }, [match]);
  const onvalid = (data: LoginInfo) => {
    console.log(data);
    requestLogin(data);

    //로그인 시
  };
  return (
    <Wrap>
      <LoginForm onSubmit={handleSubmit(onvalid)}>
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
          <KakaoLogin>카카오 로그인</KakaoLogin>
        </SocialLoginBox>
        <CloseBtn onClick={() => setIsLogin(prev => !prev)}>X</CloseBtn>
      </LoginForm>
      <Overlay onClick={() => setIsLogin(prev => !prev)} />
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
const LoginForm = styled.form`
  position: relative;
  z-index: 1000;
  width: 600px;
  height: 570px;
  background-color: white;
  display: flex;
  flex-direction: column;

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
`;
const PasswordBox = styled(EmailBox)`
  position: relative;
`;
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
const ViewPassword = styled.div`
  position: absolute;
  height: 60px;
  right: 10px;
  display: flex;
  align-items: center;
`;
const Overlay = styled.div`
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
  top: 10px;
  right: 10px;
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
