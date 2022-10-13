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
import ReviewModal from "@components/modal/ReviewCancelModal";
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
    // console.log("click");
    if (!isEdit) {
      const newData: IReview = {
        name: user?.name!,
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
    console.log("handleclickcancel");
    setIsReviewCancelModal(true);
  };
  return (
    <>
      {checkUser ? (
        <FormWrap>
          <Form as="form" onSubmit={handleSubmitReview}>
            <TitleContainer>
              <Title>플로깅</Title>
              <SubTitle>
                함께한
                <Accent> 생생한 경험</Accent>를 공유해주세요!
              </SubTitle>
            </TitleContainer>

            <SelectInput as="select" height={50}>
              <option>근교산 자락길 모임1</option>
              <option>근교산 자락길 모임2</option>
              <option>근교산 자락길 모임3</option>
              <option>근교산 자락길 모임4</option>
            </SelectInput>
            <ImageInput type="file" height={155} />
            <ReviewInput
              height={280}
              placeholder="내용을 입력해주세요."
              defaultValue={review?.description}
              {...register("description", {
                required: { value: true, message: "내용을 입력해주세요." },
              })}
            />

            <ButtonContainer>
              <Button>{review ? "수정하기" : "등록하기"}</Button>
              <Button className="cancle" type="button" onClick={handleClickCancel}>
                취소
              </Button>
            </ButtonContainer>
            <ReviewModal />
          </Form>
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
const Form = styled.form`
  width: 700px;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;
const TitleContainer = styled.div`
  margin-bottom: 20px;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  color: ${props => props.theme.mainColor};
  text-decoration: underline;
  text-underline-position: under;
`;
const SubTitle = styled.p`
  font-size: 18px;
  margin-top: 30px;
  color: ${props => props.theme.mainColor};
`;
const Accent = styled.span`
  color: ${props => props.theme.dangerColor};
`;

const Button = styled.button`
  width: 180px;
  height: 45px;

  &.cancle {
    background-color: ${props => props.theme.dangerColor};
  }
`;
const Input = styled.input<{ height: number }>`
  width: 550px;
  height: ${props => props.height}px;
  border: solid 1px #a7a7a7;
  margin-bottom: 15px;
`;
const SelectInput = styled(Input)``;
const ImageInput = styled(Input)``;
const ReviewInput = styled(Input)`
  font-size: 16px;
  padding: 10px 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 420px;
  height: 45px;
  justify-content: space-between;
`;
