import { CloseBtn, ModalVariant, Overlay, OverlayVariant } from "./LoginModal";
import styled from "styled-components";
import { ModalWrap, ModalContainer } from "@style/ModalStyle";
import { useRecoilState } from "recoil";
import { isReviewCancelAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ReviewModal() {
  const [isReviewCancelModal, setIsReviewCancelModal] = useRecoilState(isReviewCancelAtom);
  const navigate = useNavigate();
  const handleClickCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsReviewCancelModal(false);
  };
  const handleClickConfirm = () => {
    navigate("/review");
    setIsReviewCancelModal(false);
  };

  return (
    <AnimatePresence>
      {isReviewCancelModal && (
        <WelcomeModalWrap>
          <WelcomeModalContainer>
            <h2>정말로 취소하시겠어요 ?</h2>
            <p>내용은 저장되지 않습니다.</p>
            <button onClick={handleClickConfirm}>네</button>
            <button onClick={handleClickCancel}>아니요</button>
          </WelcomeModalContainer>
        </WelcomeModalWrap>
      )}
    </AnimatePresence>
  );
}

const WelcomeModalWrap = styled(ModalWrap)`
  z-index: 1000;
`;
const WelcomeModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 200px;
`;
