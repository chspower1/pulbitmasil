import { CloseBtn, LoginForm, ModalVariant, ModalWrap, Overlay, OverlayVariant } from "./LoginModal";
import styled from "styled-components";

export default function ReviewModal() {
  return (
    <WelcomeModalWrap>
      <WelcomeModalContainer>
        <h2>정말로 취소하시겠어요 ?</h2>
        <p>내용은 저장되지 않습니다.</p>
        <button>취소</button>
        <button>재작성</button>
      </WelcomeModalContainer>
    </WelcomeModalWrap>
  );
}

const WelcomeModalWrap = styled(ModalWrap)`
  z-index: 1000;
`;
const WelcomeModalContainer = styled(LoginForm)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
`;
