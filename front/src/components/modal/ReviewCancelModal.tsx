import styled from "styled-components";
import { ModalBtnContainer, ModalDesc, ModalContainer, ModalWrap, Overlay } from "@style/ModalStyle";
import { useRecoilState } from "recoil";
import { isReviewCancelAtom } from "@atom/atom";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { OverlayVariant } from "@style/ModalVariants";
import { DangerAccent } from "@style/Layout";
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
        <ReviewModalWrap>
          <ReviewModalContainer>
            <CancelDesc>
              <DangerCancelAccent>취소</DangerCancelAccent>&nbsp;하시겠습니까?
            </CancelDesc>
            <CancelDesc className="second">작성한 내용이 모두 사라집니다.</CancelDesc>

            <ModalBtnContainer>
              <CancelBtn type="button" onClick={handleClickConfirm}>
                네
              </CancelBtn>
              <CloseBtn type="button" onClick={handleClickCancel}>
                아니요
              </CloseBtn>
            </ModalBtnContainer>
          </ReviewModalContainer>
          <Overlay
            onClick={handleClickCancel}
            variants={OverlayVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </ReviewModalWrap>
      )}
    </AnimatePresence>
  );
}

const ReviewModalWrap = styled(ModalWrap)`
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 1000;
  @media screen and (max-width: 767px) {
    position: fixed;
    left: 0%;
  }
`;
const ReviewModalContainer = styled(ModalContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 500px;
  height: 200px;

  @media screen and (max-width: 767px) {
    width: 80%;
  }
`;

const DangerCancelAccent = styled(DangerAccent)`
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const CancelDesc = styled(ModalDesc)`
  &.second {
    font-size: 22px;

    @media screen and (max-width: 767px) {
      font-size: 18px;
    }
  }
`;

const CancelBtn = styled.button`
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
const CloseBtn = styled(CancelBtn)`
  background-color: ${props => props.theme.mainColor};
  &:hover {
    background-color: ${props => props.theme.accentColor};
  }
`;
