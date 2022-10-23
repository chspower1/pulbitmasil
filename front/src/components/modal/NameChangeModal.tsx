import styled from "styled-components";
import { useForm } from "react-hook-form";
import { changeName } from "@api/user";
import { NameChangeForm } from "@type/user";

import { Box, MainBtn, DangerBtn } from "@style/Layout";

import { useNavigate } from "react-router-dom";
import { ModalVariant, OverlayVariant } from "@style/ModalVariants";
import { ModalContainer, ModalWrap, Overlay } from "@style/ModalStyle";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { userAtom } from "@atom/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NameChangeModalProps {
  setIsNameChange: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  isNameChange: boolean;
  menu: string | undefined;
}

export default function NameChangeModal({ setIsNameChange, name, isNameChange, menu }: NameChangeModalProps) {
  const queryClient = useQueryClient();
  const userMutation = useMutation(changeName, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NameChangeForm>();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);

  const closeRegisterModal = async () => {
    setIsNameChange(false);
    reset();
    navigate(`/mypage/${menu}`);
  };

  const onvalid = async (data: NameChangeForm) => {
    await changeName(data.newName);
    userMutation.mutate(data?.newName);
    setUser({ ...user!, name: data?.newName });
    closeRegisterModal();
  };

  return (
    <AnimatePresence>
      {isNameChange && (
        <NameWrapper>
          <FormContainer
            onSubmit={handleSubmit(onvalid)}
            variants={ModalVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            width="700px"
            height="450px"
          >
            <Title>이름 수정</Title>

            <InputBox>
              <InputTitle>현재 이름</InputTitle>
              <Input disabled placeholder="현재 이름" defaultValue={name} type="text" id="currentName" />
            </InputBox>

            <InputBox>
              <InputTitle>새로운 이름</InputTitle>
              <Input
                placeholder="새로운 이름을 입력해주세요."
                type="text"
                id="newName"
                {...register("newName", {
                  required: { value: true, message: "이름을 입력해주세요." },
                  minLength: { value: 2, message: "2자 이상 입력해주세요." },
                })}
              />
              <ErrorMessage>{errors.newName?.message}</ErrorMessage>
            </InputBox>

            <ButtonBox>
              <MainBtn width="200px" height="60px" style={{ marginRight: "10px" }}>
                수정하기
              </MainBtn>
              <DangerBtn width="200px" height="60px" type="button" onClick={closeRegisterModal}>
                취소하기
              </DangerBtn>
            </ButtonBox>
          </FormContainer>
          <Overlay
            onClick={closeRegisterModal}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </NameWrapper>
      )}
    </AnimatePresence>
  );
}

const NameWrapper = styled(ModalWrap)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 10;
`;

const FormContainer = styled(ModalContainer)`
  color: #bdbdbd;
  padding: 20px 0;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin: 30px 0;
  color: ${props => props.theme.mainColor};

  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 530px;
  color: #8d8d8d;
  margin-bottom: 25px;

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



const ButtonBox = styled(Box)`
  margin-top: 20px;
  width: 100%;
  @media screen and (max-width: 767px) {
    width: 80%;
    font-size: 18px;
  }
`;
