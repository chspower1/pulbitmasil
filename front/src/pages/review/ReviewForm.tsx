import { useForm, useWatch } from "react-hook-form";
// import DatePicker from "react-datepicker";
import React, { useEffect, useState, Suspense } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { editReview, getOneReview, getReviews, createReview } from "@api/review";
import { FormMode, IReview, IReviewContent, IReviewUpdateData } from "@type/review";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@atom/user";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { isReviewCancelAtom } from "@atom/atom";
import ReviewModal from "@components/modal/ReviewCancelModal";
import { Title, Wrapper, Box, Container, SubTitle, DangerAccent } from "@style/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ReviewForm({ formProps }: { formProps: IReviewUpdateData }) {
  const { type, userId, reviewId } = formProps;
  console.log(formProps);
  const user = useRecoilValue(userAtom);
  console.log(user?.greenCrews)
  const [isReviewCancelModal, setIsReviewCancelModal] = useRecoilState(isReviewCancelAtom);
  const navigate = useNavigate();
  const mode = type;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IReviewContent>({ mode: "all" });
  //img preview test
  const [imagePreview, setImagePreview] = useState<any>(null); // any 말고??
  const [uploadImg, setUploadImg] = useState<any>(); // any 말고??
  const queryClient = useQueryClient();
  const image = watch("reviewImg");
  const { data: review } = useQuery<IReview>(["review", reviewId], () => getOneReview(reviewId!), {
    onSuccess(data) {
      console.log("ReviewForm query 동작", data);
      setImagePreview(review?.reviewImg!); // Query 일정시간동안 호출 안함 .그래서 해당부분 안찍힘?
      setValue("description", review?.description!);

    },
    enabled: mode === "UPDATE",
  });

  //qeury
  const reviewMutation = useMutation(mode === "CREATE" ? createReview : editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["review", reviewId]);
    },
  });

  useEffect(() => {
    setIsReviewCancelModal(false);
    setImagePreview(review?.reviewImg!); // Query 일정시간동안 호출 안함 .그래서 해당부분 안찍힘?
    setValue("description", review?.description!);
  }, []);

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(window.URL.createObjectURL(file as File));
      console.log("이미지", imagePreview);
      setUploadImg(file);

      console.log(image);
      console.log(window.URL.createObjectURL(file as File));
    }
  }, [image]);
  const handleSubmitReview = handleSubmit(data => {
    const formData = new FormData();
    formData.append("description", watch("description"));
    switch (mode) {
      case "CREATE":
        console.log(data);
        const date = new Date();
        formData.append("createAt", date.toString());
        formData.append("file", uploadImg);
        formData.append("name", user?.name!);
        console.log("Create formData", formData);
        reviewMutation.mutate(formData);
        navigate("/review");
        break;

      case "UPDATE":
        console.log(data);
        formData.append("userId", user?.id!.toString()!);
        formData.append("reviewId", reviewId!.toString());

        if (uploadImg) {
          // 사진파일이 변했다면 ,file 객체 전달
          formData.append("file", uploadImg);
        } else {
          // 사진파일이 그대로라면, 이미지 url 전달
          console.log("reviewImg", review?.reviewImg!);
          formData.append("imageUrl", review?.reviewImg! as string);
        }
        // editReview(formData, review?.reviewId!);
        console.log("Update formData", formData.get("reviewId"));
        reviewMutation.mutate(formData);
        navigate("/review");
        break;
    }
  });

  const handleClickCancel = () => {
    console.log("handleclickcancel");
    setIsReviewCancelModal(true);
  };
  const userGreenCrews = user?.greenCrews

  return (
    <FormWrap>
      <Form as="form" onSubmit={handleSubmitReview}>
        <TitleBox>
          <Title>풀빛마실 이야기</Title>
          <SubTitle>
            함께한
            <DangerAccent> 생생한 경험</DangerAccent>를 공유해주세요!
          </SubTitle>
        </TitleBox>
        <SelectInput as="select" height={40}>
          {userGreenCrews?.map(userGreenCrew => <Option>{userGreenCrew?.title ? userGreenCrew?.title : "없음"}</Option>)}
          {/* <Option>근교산 자락길 모임1</Option>
          <Option>근교산 자락길 모임2</Option>
          <Option>근교산 자락길 모임3</Option>
          <Option>근교산 자락길 모임4</Option> */}
        </SelectInput>

        <ImgBox as="label" htmlFor="input-file">
          {mode === "UPDATE" ? (
            <Img src={imagePreview} />
          ) : imagePreview ? (
            <Img src={imagePreview} />
          ) : (
            <ImgIcon src="/assets/icon/image.png" />
          )}
        </ImgBox>
        <input id="input-file" type="file" style={{ display: "none" }} {...register("reviewImg")} />

        <ReviewTextArea
          placeholder="내용을 입력해주세요."
          defaultValue={review?.description} // 텍스트는 여기서 지정중.
          {...register("description", {
            required: { value: true, message: "내용을 입력해주세요." },
          })}
        />

        <ButtonContainer>
          <Button>{mode === "UPDATE" ? "수정하기" : "등록하기"}</Button>
          <Button className="cancle" type="button" onClick={handleClickCancel}>
            취소
          </Button>
        </ButtonContainer>
        <ReviewModal />
      </Form>
    </FormWrap>
  );
}

const FormWrap = styled(Wrapper)`
  background-image: url("/assets/images/register_img.jpg");
`;
const Form = styled.form`
  width: 700px;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  border-radius: 10px;
`;
const TitleBox = styled(Box)`
  flex-direction: column;
  margin: 20px 0;
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
const SelectInput = styled(Input)`
  font-size: 18px;
  color: ${props => props.theme.accentColor};
  padding: 0px 10px;
`;
const Option = styled.option`
  font-size: 16px;
  color: ${props => props.theme.textColor};
`;
const Img = styled.img`
  height: 100%;
  object-fit: "cover";
  border: none;
`;
const ImgIcon = styled.img``;
const ReviewTextArea = styled.textarea`
  width: 550px;
  height: 300px;
  font-size: 16px;
  padding: 10px 10px;
  border: solid 1px #a7a7a7;
  margin-bottom: 15px;
  resize: none;
`;
const ImgLabel = styled.label`
  padding: 6px 25px;
  background-color: ${props => props.theme.mainColor};
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 420px;
  height: 45px;
  justify-content: space-between;
`;
const ImgBox = styled(Box)`
  width: 550px;
  height: 155px;
  overflow: hidden;
  margin: 0 auto;
  cursor: pointer;
  transition: background-color 0.4s ease;
  border: dashed 2px ${props => props.theme.weekColor};
  &:hover {
    background-color: #f5fffa;
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
