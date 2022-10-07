import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "@atom/atom";
import { Link, useNavigate } from "react-router-dom";
import { requestLogin } from "@api/api";
interface LoginInfo {
  email: string;
  password: string;
  name?: string;
}
// declare global {
//   interface Window {
//     Kakao: any;
//   }
// }

export default function LoginModal() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginInfo>();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [user, setUser] = useRecoilState(userAtom);

  const REST_API_KEY = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onvalid = handleSubmit(data => {
    console.log(data);
    requestLogin(data);
    //로그인 시
  });

  const onClickKakao = () => {
    // navigate(KAKAO_AUTH_URL);
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Wrap>
      <LoginForm onSubmit={onvalid}>
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
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password", {
              minLength: {
                value: 7,
                message: "7글자 이상 입력해주세요!",
              },
            })}
          />
        </PasswordBox>
        <LoginBtn>로그인</LoginBtn>
        <UserBox>
          <Link to="/register">
            <Register>회원가입</Register>
          </Link>
          <Link to="/register">
            <FindPassword>아이디,비밀번호 찾기</FindPassword>
          </Link>
        </UserBox>
        <SocialLoginBox>
          <NaverLogin></NaverLogin>
          <KakaoLogin onClick={onClickKakao}>카카오 로그인</KakaoLogin>
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
  color: ${props => props.theme.textColor};
  ::placeholder {
    color: ${props => props.theme.weekColor};
  }
`;
const EmailInput = styled(Input)``;
const PasswordInput = styled(Input)``;
const Overlay = styled.div`
  z-index: 100;
  position: fixed;
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
