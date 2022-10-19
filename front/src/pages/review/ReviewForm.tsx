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
import { Title, Wrapper, Box, Container, SubTitle, DangerAccent, MainBtn, DangerBtn } from "@style/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { User, UserGreenCrew } from "@type/user";
import { getUser } from "@api/user";
import { IGreenCrew } from "@type/greenCrew";
import { ModalContainer, ModalWrap } from "@style/ModalStyle";

export default function ReviewForm({ formProps }: { formProps: IReviewUpdateData }) {
  const { type, userId, reviewId } = formProps;
  console.log(formProps);
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
  const [inProgressGreenCrew, setInProgressGreenCrew] = useState<UserGreenCrew[] | undefined>();
  const [doneGreenCrews, setDoneGreenCrew] = useState<UserGreenCrew[] | undefined>();

  // Query
  const { data: user } = useQuery<User | undefined>(["user"], getUser, {
    onSuccess(data) {
      console.log("리뷰폼 유저 패치", data);
    },
  });
  const { data: review, isLoading } = useQuery<IReview>(["review", reviewId], () => getOneReview(reviewId!), {
    onSuccess(data) {
      console.log("ReviewForm query review 동작", data);
      setImagePreview(data?.reviewImg!); // Query 일정시간동안 호출 안함 .그래서 해당부분 안찍힘?
      setValue("description", data?.description!);
    },
    enabled: mode === "UPDATE",
  });
  const userGreenCrews = user?.greenCrews;

  // Mutation
  const reviewMutation = useMutation(mode === "CREATE" ? createReview : editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["review", reviewId]);
    },
  });
  const userMutation = useMutation(getUser, {
    onSuccess: () => {
      console.log("유저 뮤테이션 완료");
      queryClient.invalidateQueries(["user"]);
    },
  });

  // Util
  const checkInProgress = (greenCrews: UserGreenCrew[]) => {
    setInProgressGreenCrew(greenCrews?.filter(greenCrew => greenCrew.inProgress! === 1));
    setDoneGreenCrew(greenCrews?.filter(greenCrew => greenCrew.inProgress! === 0));
  };

  // Handle
  const onvalid = async (data: IReviewContent) => {
    console.log("------------------", data);
    const formData = new FormData();
    formData.append("description", data.description);
    switch (mode) {
      case "CREATE":
        console.log(data);
        formData.append("title", data.title);
        const createDay = dayjs(new Date());
        formData.append("createAt", createDay.toString());
        formData.append("file", uploadImg);
        console.log("Create formData", formData);
        await reviewMutation.mutate(formData);
        await userMutation.mutate();
        console.log(user);
        navigate("/review");
        break;

      case "UPDATE":
        console.log("업데이트 데이터", data);
        if (data.title === "") formData.append("title", review?.title!);
        else formData.append("title", data.title);
        console.log("||||||||||||||||||||||||||", review?.title);
        console.log("||||||||||||||||||||||||||", formData.get("title"));
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
        await reviewMutation.mutate(formData);
        await userMutation.mutate();
        navigate("/review");
        break;
    }
  };
  // useEffect
  useEffect(() => {
    setIsReviewCancelModal(false);
    setImagePreview(review?.reviewImg!); // Query 일정시간동안 호출 안함 .그래서 해당부분 안찍힘?
    setValue("description", review?.description!);
  }, []);

  useEffect(() => {
    checkInProgress(user?.greenCrews!);
  }, []);
  const handleClickCancel = () => {
    console.log("handleclickcancel");
    setIsReviewCancelModal(true);
  };

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
  return (
    <FormWrap>
      <Form as="form" onSubmit={handleSubmit(onvalid)}>
        <TitleBox>
          <Title>풀빛마실 이야기</Title>
          <ReviewSubTitle>
            함께한
            <DangerAccent> 생생한 경험</DangerAccent>를 공유해주세요!
          </ReviewSubTitle>
        </TitleBox>
        {mode === "CREATE" && doneGreenCrews && (
          <SelectInput as="select" height={40} {...register("title")}>
            {doneGreenCrews?.map(doneGreenCrew =>
              review?.title === doneGreenCrew.title ? (
                <Option selected>{doneGreenCrew?.title}</Option>
              ) : (
                <Option>{doneGreenCrew?.title}</Option>
              ),
            )}
          </SelectInput>
        )}
        {mode === "UPDATE" && !isLoading && (
          <SelectInput as="select" height={40} {...register("title")}>
            {doneGreenCrews?.map(doneGreenCrew =>
              review?.title === doneGreenCrew.title ? (
                <Option selected>{doneGreenCrew?.title}</Option>
              ) : (
                <Option>{doneGreenCrew?.title}</Option>
              ),
            )}
          </SelectInput>
        )}

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
          {...register("description", {
            required: { value: true, message: "내용을 입력해주세요." },
          })}
        />

        <ButtonContainer>
          <MainBtn>{mode === "UPDATE" ? "수정하기" : "등록하기"}</MainBtn>
          <DangerBtn className="cancle" type="button" onClick={handleClickCancel}>
            취소
          </DangerBtn>
        </ButtonContainer>
        <ReviewModal />
      </Form>
    </FormWrap>
  );
}

const FormWrap = styled(Wrapper)`
  position: relative;
  flex-direction: column;
  background-image: url("/assets/images/register_img.jpg");
`;
const Form = styled(ModalContainer)`
  width: 600px;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;
const TitleBox = styled(Box)`
  flex-direction: column;
`;

const ReviewSubTitle = styled(SubTitle)`
  margin-top: 15px;
`;

const Input = styled.input<{ height: number }>`
  width: 550px;
  height: ${props => props.height}px;
  border: solid 1px #a7a7a7;
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
  margin-bottom: 10px 0;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 50%;
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
