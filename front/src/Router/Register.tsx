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
    watch,
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = data => console.log(data);
  const onErrors: SubmitHandler<any> = errors => console.error(errors);

  return (
    <Wrapper>
      <FormContainer>
        <Title>회원가입</Title>
        <p>가입을 통해 더 많은 서비스를 만나보세요!</p>
        <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
          <InputContainer>
            <p>이름</p>
            <Input
              id="name"
              {...register("name", {
                required: { value: true, message: "이름을 입력해주세요." },
              })}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </InputContainer>

          <InputContainer>
            <p>이메일</p>
            <Input
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
            <ErrorMessage>{errors.id?.message}</ErrorMessage>
          </InputContainer>

          <InputContainer>
            <p>비밀번호</p>
            <Input
              id="password"
              // type="password"
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요." },
                minLength: { value: 8, message: "8자 이상 입력해주세요." },
              })}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </InputContainer>

          <InputContainer>
            <p>비밀번호 확인</p>
            <Input
              type="confirmPassword"
              {...register("confirmPassword", {
                required: { value: true, message: "비밀번호를 입력해주세요." },
                validate: (checkPassword: string) => watch("password") != checkPassword && "비밀번호를 확인해주세요.",
              })}
            />
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </InputContainer>
          <Button type="submit">가입하기</Button>
          <Button>로그인</Button>
        </Form>
      </FormContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  /* background-image: url(../../register.jpg); */
  color: black;
  /* background-image: url(${process.env.PUBLIC_URL}/register.jpg); */
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  /* opacity: 0.5; */
`;
const FormContainer = styled.div`
  position: relative;
  width: 500px;
  height: 600px;
  border: 8px solid beige;
  border-radius: 20px;
  padding: 50px 30px;
  color: #bdbdbd;
  margin: auto;
  float: right;
`;

// const FormContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 50px;
// `;

const Title = styled.p`
  width: 100%;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #00600f;
`;

const InputContainer = styled.div`
  width: 80%;
  color: #8d8d8d;
  &:first-child {
    margin-top: 40px;
  }
  &:not(:first-child) {
    margin-top: 30px;
  }
  margin: auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 5px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding: 5px 10px;

  :focus {
    outline: none;
  }
`;
const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 48%;
  &:not(:first-child) {
    margin-left: 5px;
  }
  margin-top: 20px;
`;

const Form = styled.form`
  width: 80%;
  margin: auto;
  display: inline;
  margin: 0px;
`;
