import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@api/user";
import { UserRegisterForm } from "@type/user";
import { ViewPassword } from "@components/modal/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Wrapper, MainBtn } from "@style/Layout";
import { useNavigate } from "react-router-dom";
import { ModalContainer } from "@style/ModalStyle";

export default function Register() {
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
  } = useForm<UserRegisterForm>();

  const onSubmitRegister = handleSubmit(data => {
    delete data.confirmPassword;
    registerUser(data).then(status => {
      if (status === 201) {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      } else if (status === 400) {
        alert("이미 가입된 이메일 입니다. 다른 이메일로 가입해 주세요.");
      }
    });
  });

  return (
    <RegisterWrapper>
      <FormContainer onSubmit={onSubmitRegister}>
        <Title>회원가입</Title>
        <Description>풀빛마실 멤버로 참여해보세요!</Description>

        <InputBox>
          <InputTitle>이름</InputTitle>
          <Input
            placeholder="이름을 입력해주세요."
            id="name"
            type="text"
            {...register("name", {
              required: { value: true, message: "이름을 입력해주세요." },
            })}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </InputBox>

        <InputBox>
          <InputTitle>이메일</InputTitle>
          <Input
            placeholder="이메일을 입력해주세요."
            type="text"
            id="id"
            {...register("email", {
              required: "아이디를 입력해주세요.",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "이메일 형식에 맞지 않습니다!",
              },
            })}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </InputBox>
        <InputBox>
          <InputTitle>비밀번호</InputTitle>
          <Input
            placeholder="숫자,특수문자,영문 포함 8자리 이상"
            type={isViewPassword ? "text" : "password"}
            id="password"
            // type="password"
            {...register("password", {
              required: { value: true, message: "비밀번호를 입력해주세요." },
              minLength: { value: 8, message: "8자 이상 입력해주세요." },
              // pattern: {
              //   value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
              //   message: "숫자,특수문자,영문 포함 8자리 이상 적어주세요.",
              // },
            })}
          />
          <ViewPassword style={{ top: "18px" }}>
            <FontAwesomeIcon
              icon={isViewPassword ? faEye : faEyeSlash}
              color="#2A9C6B"
              style={{ cursor: "pointer" }}
              onClick={() => setIsViewPassword(cur => !cur)}
            />
          </ViewPassword>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </InputBox>

        <InputBox>
          <InputTitle>비밀번호 확인</InputTitle>
          <Input
            placeholder="동일한 비밀번호를 입력해주세요."
            type={isViewConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "비밀번호를 한번 더 입력해 주세요",
              validate: {
                mathchesPreviousPassword: value => {
                  const { password } = getValues();
                  return password === value || "비밀번호가 일치하지 않습니다.";
                },
              },
            })}
          />
          <ViewPassword style={{ top: "18px" }}>
            <FontAwesomeIcon
              icon={isViewConfirmPassword ? faEye : faEyeSlash}
              color="#2A9C6B"
              style={{ cursor: "pointer" }}
              onClick={() => setIsViewConfirmPassword(cur => !cur)}
            />
          </ViewPassword>

          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </InputBox>
        <MainBtn width="200px" height="60px">
          가입하기
        </MainBtn>
      </FormContainer>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled(Wrapper)`
  background-image: url(${process.env.PUBLIC_URL}/assets/images/register_img.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-repeat: no-repeat;
  background-size: cover;
  /* opacity: 0.5; */
`;
const FormContainer = styled(ModalContainer)`
  z-index: 1;
  background-color: white;
  position: relative;
  width: 650px;
  height: 750px;
  padding: 60px;
  padding-bottom: 75px;
  color: #bdbdbd;
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 758px) {
    padding: 40px 10px;
    width: 90%;
    height: 650px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: ${props => props.theme.mainColor};
`;
const Description = styled.p`
  font-size: 16px;
  margin-bottom: 45px;
  color: ${props => props.theme.textColor};
`;
const InputBox = styled.div`
  position: relative;
  width: 530px;
  color: #8d8d8d;
  margin-bottom: 25px;
  @media screen and (max-width: 758px) {
    width: 100%;
  }
`;
const InputTitle = styled.h3`
  font-size: 13px;
  margin-bottom: 12px;
  color: ${props => props.theme.textColor};
`;
const Input = styled.input`
  width: 530px;
  height: 50px;
  font-size: 18px;
  padding: auto;
  padding-left: 10px;
  color: ${props => props.theme.textColor};
  ::placeholder {
    color: ${props => props.theme.weekColor};
  }
  @media screen and (max-width: 758px) {
    width: 100%;
  }
`;
const ErrorMessage = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${props => props.theme.dangerColor};
  height: 14px;
  right: 0px;
  bottom: -20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 530px;
  height: 500px;
  margin: auto;
`;
