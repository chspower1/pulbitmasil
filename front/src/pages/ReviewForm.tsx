import { useForm, useWatch } from "react-hook-form";
// import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { editReview, getOneReview, getReviews, createReview } from "@api/review";
import { IReview, IReviewContent } from "@type/review";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@atom/user";
import { useNavigate, useLocation } from "react-router-dom";
import { isReviewCancelAtom } from "@atom/atom";
import ReviewModal from "@components/modal/ReviewModal";
import { Wrapper } from "@style/Container";

export default function ReviewForm() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEdit = state?.isEdit! as boolean;
  const checkUser = isEdit === undefined ? false : isEdit ? user?.id === state.review.userId : true;
  const [review, setReview] = useState<IReview>(state?.review!);

  const [isReviewCancelModal, setIsReviewCancelModal] = useRecoilState(isReviewCancelAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IReviewContent>();
  useEffect(() => {
    setIsReviewCancelModal(false);
  }, []);

  const handleSubmitReview = handleSubmit(data => {
    console.log("click");
    if (!isEdit) {
      const newData: IReview = {
        userName: user?.name!,
        description: data.description,
        createAt: new Date(),
      };
      createReview(newData);
      navigate("/review");
    } else {
      // setReview({ ...review!, title: watch("title"), description: watch("description") });
      const newData: IReview = {
        ...review!,
        description: watch("description"),
      };
      editReview(newData);
      navigate("/review");
    }
  });
  const handleClickCancel = () => {
    setIsReviewCancelModal(true);
  };
  return (
    <>
      {checkUser ? (
        <FormWrap as="form" onSubmit={handleSubmitReview}>
          <TitleContainer>
            <Title>플로깅</Title>
            <SubTitle>
              함께한
              <Accent> 생생한 경험</Accent>를 공유해주세요!
            </SubTitle>
          </TitleContainer>

          {/* <ReviewInput
            style={{ height: "60px" }}
            defaultValue={review?.title}
            placeholder="제목을 입력해주세요."
            {...register("title", {
              required: { value: true, message: "제목을 입력해주세요." },
            })}
          /> */}

          <ReviewInput
            placeholder="내용을 입력해주세요."
            defaultValue={review?.description}
            {...register("description", {
              required: { value: true, message: "내용을 입력해주세요." },
            })}
          />

          <ButtonContainer>
            <Button>{review ? "수정하기" : "등록하기"}</Button>
            <Button type="button" onClick={handleClickCancel}>
              취소
            </Button>
          </ButtonContainer>
          <ReviewModal />
        </FormWrap>
      ) : (
        "권한이 없습니다."
      )}
    </>
  );
}

const FormWrap = styled(Wrapper)`
  flex-direction: column;
  background-image: url("/assets/images/walk.jpg");
  margin-top: 50px;
  padding: 50px 250px;
`;

const TitleContainer = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 50px;
  text-align: center;
  color: ${props => props.theme.mainColor};
  text-decoration: underline;
  text-underline-position: under;
`;
const SubTitle = styled.p`
  font-size: 25px;
  margin-top: 30px;
  color: ${props => props.theme.mainColor};
`;
const Accent = styled.span`
  color: ${props => props.theme.dangerColor};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48%;
  height: 20px;
  &:not(:first-child) {
    margin-left: 5px;
  }
  margin-top: 20px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const ReviewInput = styled.textarea`
  width: 500px;
  height: 400px;
  font-size: 16px;
  padding: 10px 10px;
  resize: none;
`;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
`;
