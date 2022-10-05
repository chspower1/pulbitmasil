import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Register() {
  interface User {
    name: string;
    id: string;
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <label htmlFor="id">이메일 : </label>
        <input
          id="id"
          {...register("id", {
            required: "아이디를 입력해주세요.",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "이메일 형식에 맞지 않습니다!",
            },
          })}
        />
        <p>{errors.id?.message}</p>

        <label htmlFor="name">이름 : </label>
        <input
          id="name"
          {...register("name", {
            required: { value: true, message: "이름을 입력해주세요." },
          })}
        />
        <p>{errors.name?.message}</p>

        <label htmlFor="password">비밀번호 : </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: { value: true, message: "비밀번호를 입력해주세요." },
            minLength: { value: 8, message: "8자 이상 입력해주세요." },
          })}
        />
        <p>{errors.password?.message}</p>

        <label htmlFor="password">비밀번호 확인 : </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: { value: true, message: "비밀번호를 입력해주세요." },
            validate: {},
          })}
        />

        <button type="submit">가입하기</button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  background-color: beige;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding-top: 100px;
`;
