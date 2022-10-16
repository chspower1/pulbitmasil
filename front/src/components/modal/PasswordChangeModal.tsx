import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { changePassword, registerUser } from "@api/user";
import { PasswordChangeForm, UserRegisterForm } from "@type/user";
import { Overlay, ViewPassword } from "@components/modal/LoginModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Wrapper } from "@style/Layout";
import { UserPasswordProps } from "@pages/UserInfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@atom/user";
import { AnimatePresence } from "framer-motion";
import { OverlayVariant } from "./LoginModal";

export default function PasswordChangeModal({ isPasswordChange, setIsPasswordChange }: UserPasswordProps) {
  const [isViewCurPassword, setIsViewCurPassword] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<PasswordChangeForm>();

  const onSubmitRegister = handleSubmit(data => {
    changePassword(data?.changePassword);
    setIsPasswordChange(false);
  });

  return (
    <AnimatePresence>
      <></>
      {isPasswordChange && (
        <PasswordWrapper>
          <FormContainer>
            <Title>비밀번호 수정</Title>
            <Form onSubmit={onSubmitRegister}>
              <InputBox>
                <InputTitle>현재 비밀번호</InputTitle>
                <Input
                  placeholder="숫자,특수문자,영문 포함 8자리 이상"
                  type={isViewCurPassword ? "text" : "password"}
                  id="currentPassword"
                  // type="password"
                  {...register("currentPassword", {
                    required: { value: true, message: "비밀번호를 입력해주세요." },
                    minLength: { value: 8, message: "8자 이상 입력해주세요." },
                  })}
                />
                <ViewPassword style={{ top: "18px" }}>
                  <FontAwesomeIcon
                    icon={isViewCurPassword ? faEye : faEyeSlash}
                    color="#2A9C6B"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsViewCurPassword(cur => !cur)}
                  />
                </ViewPassword>
                <ErrorMessage>{errors.currentPassword?.message}</ErrorMessage>
              </InputBox>

              <InputBox>
                <InputTitle>비밀번호</InputTitle>
                <Input
                  placeholder="숫자,특수문자,영문 포함 8자리 이상"
                  type={isViewPassword ? "text" : "password"}
                  id="changePassword"
                  // type="password"
                  {...register("changePassword", {
                    required: { value: true, message: "비밀번호를 입력해주세요." },
                    minLength: { value: 8, message: "8자 이상 입력해주세요." },
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
                <ErrorMessage>{errors.changePassword?.message}</ErrorMessage>
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
                        const { changePassword } = getValues();
                        return changePassword === value || "비밀번호가 일치하지 않습니다.";
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

              <Button>수정하기</Button>
              <Button type="button" onClick={() => setIsPasswordChange(false)}>
                취소하기
              </Button>
            </Form>
          </FormContainer>
          <Overlay
            onClick={() => setIsPasswordChange(false)}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </PasswordWrapper>
      )}
    </AnimatePresence>
  );
}

const PasswordWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const FormContainer = styled.div`
  background-color: white;
  position: relative;
  width: 700px;
  height: 750px;
  padding: 60px;
  padding-bottom: 75px;
  color: #bdbdbd;
  float: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
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
`;
const ErrorMessage = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${props => props.theme.dangerColor};
  height: 14px;
  right: 0px;
  bottom: -20px;
`;

const Button = styled.button`
  width: 200px;
  height: 64px;
  font-size: 18px;
  margin-top: 45px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 530px;
  height: 500px;
  margin: auto;
  /* display: inline; */
`;

// export default function PasswordChangeModal({ setIsPasswordChange }: UserPasswordProps) {

//   const [isViewPassword, setIsViewPassword] = useState(false);
//   const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);

//   const [user, setUser] = useRecoilState(userAtom);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     getValues,
//   } = useForm<PasswordChangeForm>();

//   const onSubmitRegister = handleSubmit(data => {
//     delete data.confirmPassword;
//     // console.log(data);
//     registerUser(data);
//   });

//   return (
//     <AnimatePresence>
//     {isLogoutModal && (
//     <RegisterWrapper>
//       <FormContainer>
//         <Title>비밀번호변경</Title>
//         <Description>풀빛마실 멤버로 참여해보세요!</Description>
//         <Form onSubmit={onSubmitRegister}>
//           <InputBox>
//             <InputTitle>현재 비밀번호</InputTitle>
//             <Input
//               placeholder="현재 비밀번호를 입력해주세요."
//               id="name"
//               type="text"
//               {...register("name", {
//                 required: { value: true, message: "이름을 입력해주세요." },
//               })}
//             />
//             <ErrorMessage>{errors.name?.message}</ErrorMessage>
//           </InputBox>

//           <InputBox>
//             <InputTitle>비밀번호</InputTitle>
//             <Input
//               placeholder="숫자,특수문자,영문 포함 8자리 이상"
//               type={isViewPassword ? "text" : "password"}
//               id="password"
//               // type="password"
//               {...register("password", {
//                 required: { value: true, message: "비밀번호를 입력해주세요." },
//                 minLength: { value: 8, message: "8자 이상 입력해주세요." },
//               })}
//             />
//             <ViewPassword style={{ top: "18px" }}>
//               <FontAwesomeIcon
//                 icon={isViewPassword ? faEye : faEyeSlash}
//                 color="#2A9C6B"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setIsViewPassword(cur => !cur)}
//               />
//             </ViewPassword>
//             <ErrorMessage>{errors.password?.message}</ErrorMessage>
//           </InputBox>

//           <InputBox>
//             <InputTitle>비밀번호 확인</InputTitle>
//             <Input
//               placeholder="동일한 비밀번호를 입력해주세요."
//               type={isViewConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               {...register("confirmPassword", {
//                 required: "비밀번호를 한번 더 입력해 주세요",
//                 validate: {
//                   mathchesPreviousPassword: value => {
//                     const { password } = getValues();
//                     return password === value || "비밀번호가 일치하지 않습니다.";
//                   },
//                 },
//               })}
//             />
//             <ViewPassword style={{ top: "18px" }}>
//               <FontAwesomeIcon
//                 icon={isViewConfirmPassword ? faEye : faEyeSlash}
//                 color="#2A9C6B"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setIsViewConfirmPassword(cur => !cur)}
//               />
//             </ViewPassword>

//             <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
//           </InputBox>
//           <Button>가입하기</Button>
//         </Form>
//       </FormContainer>
//     </RegisterWrapper>
//   );
// }

// const RegisterWrapper = styled(Wrapper)`
//   background-image: url(${process.env.PUBLIC_URL}/assets/images/register_img.jpg);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;

//   background-repeat: no-repeat;
//   background-size: cover;
//   /* opacity: 0.5; */
// `;
// const FormContainer = styled.div`
//   background-color: white;
//   position: relative;
//   width: 700px;
//   height: 750px;
//   padding: 60px;
//   padding-bottom: 75px;
//   color: #bdbdbd;
//   float: right;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h1`
//   font-size: 32px;
//   font-weight: bold;
//   margin-bottom: 30px;
//   color: ${props => props.theme.mainColor};
// `;
// const Description = styled.p`
//   font-size: 16px;
//   margin-bottom: 45px;
//   color: ${props => props.theme.textColor};
// `;
// const InputBox = styled.div`
//   position: relative;
//   width: 530px;
//   color: #8d8d8d;
//   margin-bottom: 25px;
// `;
// const InputTitle = styled.h3`
//   font-size: 13px;
//   margin-bottom: 12px;
//   color: ${props => props.theme.textColor};
// `;
// const Input = styled.input`
//   width: 530px;
//   height: 50px;
//   font-size: 18px;
//   padding: auto;
//   padding-left: 10px;
//   color: ${props => props.theme.textColor};
//   ::placeholder {
//     color: ${props => props.theme.weekColor};
//   }
// `;
// const ErrorMessage = styled.div`
//   position: absolute;
//   font-size: 12px;
//   color: ${props => props.theme.dangerColor};
//   height: 14px;
//   right: 0px;
//   bottom: -20px;
// `;

// const Button = styled.button`
//   width: 200px;
//   height: 64px;
//   font-size: 18px;
//   margin-top: 45px;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 530px;
//   height: 500px;
//   margin: auto;
//   /* display: inline; */
// `;
