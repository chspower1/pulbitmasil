import { ReviewDeleteIdAtom } from "@atom/atom";
import { userAtom } from "@atom/user";
import { DangerBtn, MainBtn } from "@style/Layout";
import { ModalContainer, ModalWrap } from "@style/ModalStyle";
import { IReview } from "@type/review";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

export default function ReviewDetailModal({ review }: { review: IReview }) {
  const { reviewId, name, createAt, description, userId, reviewImg, title, area } = review;
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const setReviewDelId = useSetRecoilState(ReviewDeleteIdAtom);

  const handleClickOverlay = () => {
    navigate("/review");
  };

  const handleClickEdit = () => {
    navigate(`/review/edit/${reviewId}`, { state: { reviewId, userId } });
  };
  const createDay = dayjs(createAt!).format("YYYY-MM-DD");

  return (
    <ModalWrap>
      <Overlay
        onClick={handleClickOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      <ReviewContainer layoutId={`${reviewId}wrap`}>
        <ImgContainer>
          <ReviewImg
            src={reviewImg as string}
            alt="review image"
            //
          ></ReviewImg>
        </ImgContainer>
        <ContentsContainer layoutId={`${reviewId}review`}>
          <InfoContainer>
            <CardImg src={`/assets/icon/user/profile01.png`} />
            <InfoBox>
              <p style={{ fontSize: "25px" }}>
                <span style={{ color: "green" }}>{name ? name : "***"}</span> 님
              </p>
              <p style={{ fontSize: "20px", marginTop: "5px" }}>{createDay} </p>
            </InfoBox>
            <Area>{area}</Area>
          </InfoContainer>

          <TextContainer>
            <p style={{ color: "#636E72", fontSize: "20px", fontWeight: "bold" }}>{title}</p>
            <Description className={userId === user?.id ? "small" : "normal"}>{description}</Description>
          </TextContainer>
        </ContentsContainer>
        <ButtonContainer layoutId={`${reviewId}btn`}>
          {user?.id === userId && (
            <>
              <MainBtn type="button" onClick={handleClickEdit}>
                수정
              </MainBtn>
              <DangerBtn
                type="button"
                onClick={() => {
                  setReviewDelId(reviewId!);
                }}
              >
                삭제
              </DangerBtn>
            </>
          )}
        </ButtonContainer>
      </ReviewContainer>
    </ModalWrap>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ReviewContainer = styled(ModalContainer)`
  z-index: 2000;
  position: absolute;
  width: 500px;
  height: 600px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  @media screen and (max-width: 758px) {
    width: 95%;
  }
`;

const ImgContainer = styled(motion.div)`
  width: 100%;
  height: 300px;
  position: relative;
`;
const ReviewImg = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
`;
const TextContainer = styled(motion.div)`
  width: 100%;
  height: 100px;
  margin-top: 20px;
`;

const Description = styled(motion.div)`
  padding: 10px;
  width: 100%;
  letter-spacing: 1px;
  line-height: 1.3em;
  margin-top: 10px;
  font-size: 16px;
  overflow-x: hidden;
  overflow-y: auto;
  resize: none;
  color: ${props => props.theme.textColor};
  border: solid 1px ${props => props.theme.borderColor};
  &.small {
    height: 110px;
  }
  &.normal {
    height: 150px;
  }
`;
const InfoBox = styled(motion.div)`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ContentsContainer = styled(motion.div)`
  width: 100%;
  height: 250px;
  padding: 30px;
`;
const Area = styled(motion.p)`
  position: absolute;
  right: 15px;
  @media screen and (max-width: 758px) {
    bottom: 0px;
  }
`;
const InfoContainer = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 35px;
  margin: auto;
`;
const CardImg = styled(motion.img)`
  width: 30px;
  height: 30px;
`;
const ButtonContainer = styled(motion.div)`
  display: flex;
  width: 50%;
  position: absolute;
  margin: auto;
  justify-content: space-between;
  bottom: 20px;
  @media screen and (max-width: 758px) {
    width: 70%;
  }
`;
