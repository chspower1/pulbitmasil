import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLoginAtom, userAtom } from "@atom/atom";
import { requestLogin } from "@api/api";
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
  const [user, setUser] = useRecoilState(userAtom);

  const onvalid = handleSubmit(data => {
    console.log(data);
    requestLogin(data);

    //로그인 시
  });
  return (
    <Wrap>
      <LoginForm onSubmit={onvalid}>
        <Title>Login</Title>
        <EmailBox>
          <Label htmlFor="email">이메일</Label>
          <EmailInput
            id="email"
            type="text"
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
          <Label htmlFor="password">비밀번호</Label>
          <PasswordInput
            id="password"
            type="password"
            {...register("password", {
              minLength: {
                value: 7,
                message: "7글자 이상 입력해주세요!",
              },
            })}
          />
        </PasswordBox>
        <LoginBtn>로그인</LoginBtn>
        <Btn onClick={() => setIsLogin(prev => !prev)}>X</Btn>
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
  width: 300px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  position: absolute;
  top: 20px;
`;
const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;
const PasswordBox = styled(EmailBox)``;
const Label = styled.label``;
const Input = styled.input`
  height: 20px;
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
const Btn = styled.button`
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const LoginBtn = styled.button``;
