import styled from "styled-components";
import { useForm } from "react-hook-form";
import { changeName } from "@api/user";
import { NameChangeForm } from "@type/user";

import { Wrapper } from "@style/Layout";

import { useNavigate } from "react-router-dom";
import { ModalVariant, OverlayVariant } from "@style/ModalVariants";
import { ModalContainer, ModalWrap, Overlay } from "@style/ModalStyle";
import { AnimatePresence } from "framer-motion";

interface NameChangeModalProps {
  setIsNameChange: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  isNameChange: boolean;
  menu: string | undefined;
}

export default function NameChangeModal({ setIsNameChange, name, isNameChange, menu }: NameChangeModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
  } = useForm<NameChangeForm>();
  const navigate = useNavigate();
  const closeRegisterModal = async () => {
    setIsNameChange(false);
    reset();
    navigate(`/mypage/${menu}`);
  };

  const handleSubmitChange = handleSubmit(data => {
    changeName(data.newName);
    closeRegisterModal();
  });

  return (
    <AnimatePresence>
      {isNameChange && (
        <PasswordWrapper>
          <FormContainer
            onSubmit={handleSubmitChange}
            variants={ModalVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Title>이름 수정</Title>

            <InputBox>
              <InputTitle>현재 이름</InputTitle>
              <Input
                placeholder="현재 이름"
                defaultValue={name}
                type="text"
                id="currentName"
                {...register("currentName", {
                  required: { value: true, message: "이름을 입력해주세요." },
                  minLength: { value: 2, message: "2자 이상 입력해주세요." },
                })}
              />
              <ErrorMessage>{errors.currentName?.message}</ErrorMessage>
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
            <Button>수정하기</Button>
            <Button type="button" onClick={closeRegisterModal}>
              취소하기
            </Button>
          </FormContainer>
          <Overlay
            onClick={closeRegisterModal}
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

const PasswordWrapper = styled(ModalWrap)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const FormContainer = styled(ModalContainer)`
  width: 700px;
  height: 750px;
  padding: 60px;
  padding-bottom: 75px;
  color: #bdbdbd;
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
`;
