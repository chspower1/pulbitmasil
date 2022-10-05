import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLoginAtom } from "@atom/atom";
interface Login {
  email: string;
  password: string;
}

export default function LoginModal() {
  const {
    register,
    formState: { errors },
    setError,
  } = useForm();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  return (
    <Wrap>
      <LoginForm>
        <h1>Login</h1>
        <label htmlFor="id">ID</label>
        <EmailInput
          id="id"
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

        <input
          type="password"
          {...register("password", {
            minLength: {
              value: 7,
              message: "7글자 이상 입력해주세요!",
            },
          })}
        />
        <button>로그인</button>
        <button onClick={() => setIsLogin(prev => !prev)}>X</button>
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
  width: 300px;
  height: 500px;
  background-color: white;
  z-index: 1000;
`;
const EmailInput = styled.input``;
const Overlay = styled.div`
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
const LoginBtn = styled.button``;
