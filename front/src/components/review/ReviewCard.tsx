import { userAtom } from "@atom/user";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IReview } from "@type/review";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReviewDeleteIdAtom } from "@atom/atom";
import dayjs from "dayjs";
import { MainBtn, DangerBtn } from "@style/Layout";

export default function Card({ review }: { review: IReview }): React.ReactElement {
  const { userId, reviewId, description, createAt, name, reviewImg, title, area } = review;
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const setReviewDelId = useSetRecoilState(ReviewDeleteIdAtom);

  const createDay = dayjs(createAt).format("YYYY-MM-DD");

  return (
    <>
      <CardWrap whileHover={{ scale: 1.06 }} layoutId={`${reviewId}wrap`}>
        <motion.div
          onClick={() => {
            navigate(`${reviewId}`);
          }}
        >
          <ImgContainer>
            <ReviewImg src={reviewImg as string} alt="review image"></ReviewImg>
          </ImgContainer>
          <ReviewContainer layoutId={`${reviewId}review`}>
            <InfoContainer>
              <CardImg src={`/assets/icon/user/profile01.png`} />
              <InfoBox>
                <p style={{ fontSize: "18px" }}>
                  <span style={{ color: "green" }}>{name ? name : "***"}</span> 님
                </p>
                <p style={{ fontSize: "14px", marginTop: "5px" }}>{createDay} </p>
              </InfoBox>
              <p style={{ position: "absolute", right: "10px" }}>{area}</p>
            </InfoContainer>
            <TextContainer>
              <p style={{ color: "#636E72", fontSize: "16px", fontWeight: "bold" }}>{title}</p>
              <Description>{description}</Description>
            </TextContainer>
          </ReviewContainer>
        </motion.div>
        <ButtonContainer layoutId={`${reviewId}btn`}>
          {user?.id === userId ? (
            <MainBtn onClick={() => navigate(`edit/${reviewId}`, { state: { reviewId, userId } })} width="80px">
              수정
            </MainBtn>
          ) : null}

          {user?.id === userId ? (
            <DangerBtn
              width="80px"
              onClick={() => {
                setReviewDelId(reviewId!);
              }}
            >
              삭제
            </DangerBtn>
          ) : null}
        </ButtonContainer>
      </CardWrap>
    </>
  );
}

const CardWrap = styled(motion.div)`
  position: relative;
  width: 370px;
  height: 430px;
  background-color: white;
  box-shadow: 3px 3px 15px #b0bec5;
  margin: 0 23px;
  margin-bottom: 40px;
  cursor: pointer;
`;
const InfoContainer = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  height: 35px;
  margin: auto;
`;
const ReviewContainer = styled(motion.div)`
  width: 100%;
  padding: 20px;
  padding-bottom: 0px;
`;

const ImgContainer = styled(motion.div)`
  width: 370px;
  height: 245px;
  position: relative;
`;
const TextContainer = styled(motion.div)`
  width: 100%;
  height: 60px;
  margin-top: 20px;
`;

const ReviewImg = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoBox = styled(motion.div)`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

//이미지로 변경예정
const CardImg = styled(motion.img)`
  width: 30px;
  height: 30px;
`;
const ButtonContainer = styled(motion.div)`
  display: flex;
  position: absolute;
  justify-content: space-between;
  width: 45%;
  bottom: 10px;
  right: 10px;
`;
const Description = styled(motion.p)`
  letter-spacing: 1px;
  line-height: 1.3em;
  margin-top: 10px;
  width: 100%;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
