import { AnimatePresence } from "framer-motion";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalBtnContainer, ModalDesc, ModalContainer, ModalWrap as FindModalWrap, Overlay } from "@style/ModalStyle";

import { isPasswordFindModalAtom } from "@atom/user";
import { useForm } from "react-hook-form";
import { resetPassword } from "@api/user";
import { ModalVariant, OverlayVariant } from "@style/ModalVariants";
import { Box, DangerAccent } from "@style/Layout";

interface EmailForm {
  email: string;
}
export default function FindPasswordModal() {
  const [isFindPassword, setIsFindPassword] = useRecoilState(isPasswordFindModalAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<EmailForm>();

  const closeFindModal = async () => {
    setIsFindPassword(false);
    reset();
  };

  const handleSubmitFind = handleSubmit(data => {
    resetPassword(watch("email")).then(status => {
      if (status === 205) {
        closeFindModal();
        alert("임시비밀번호가 발급되었습니다.");
      } else {
        alert("이메일을 다시 확인해주세요.");
      }
    });
  });

  return (
    <AnimatePresence>
      {isFindPassword && (
        <FindModalWrap>
          <FindForm onSubmit={handleSubmitFind} variants={ModalVariant} initial="initial" animate="animate" exit="exit">
            <LogoutDesc>
              가입한<DangerAccent>&nbsp;이메일&nbsp;</DangerAccent>로
            </LogoutDesc>
            <LogoutDesc>임시비밀번호가 발급됩니다.</LogoutDesc>
            <LogoutDesc>하단에 이메일 주소를 적어주세요.</LogoutDesc>
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

            <ModalBtnContainer>
              <ConfirmBtn>확인</ConfirmBtn>

              <CloseBtn type="button" onClick={closeFindModal}>
                취소
              </CloseBtn>
            </ModalBtnContainer>
          </FindForm>
          <Overlay
            onClick={() => setIsFindPassword(false)}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </FindModalWrap>
      )}
    </AnimatePresence>
  );
}
const FindForm = styled(ModalContainer)`
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const LogoutDesc = styled(ModalDesc)`
  &:first-child {
    margin-top: 50px;
  }
  font-size: 22px;
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
`;

const ConfirmBtn = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 22px;
  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: #cc5e43;
  }
  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;
const CloseBtn = styled(ConfirmBtn)`
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
`;

const InputBox = styled(Box)`
  position: relative;
  flex-direction: column;
  width: 300px;
  color: #8d8d8d;
  margin: 10px 0;
  @media screen and (max-width: 767px) {
    width: 90%;
  }
  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;
const InputTitle = styled.h3`
  font-size: 13px;
  margin-bottom: 12px;
  color: ${props => props.theme.textColor};
  align-self: start;
`;
const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 18px;
  padding: auto;
  padding-left: 10px;
  margin-bottom: 15px;
  color: ${props => props.theme.textColor};
  ::placeholder {
    color: ${props => props.theme.weekColor};
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    ::placeholder {
      font-size: 16px;
    }
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
