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
import { Title, Wrapper, Box, Container, SubTitle, DangerAccent, MainBtn, DangerBtn, Desc } from "@style/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { User, UserGreenCrew } from "@type/user";
import { getUser } from "@api/user";
import { IGreenCrew } from "@type/greenCrew";
import { ModalContainer, ModalWrap } from "@style/ModalStyle";

export default function ReviewForm({ formProps }: { formProps: IReviewUpdateData }) {
  const { type, userId, reviewId } = formProps;
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
  const { data: user } = useQuery<User | undefined>(["user"], getUser);
  const { data: review, isLoading } = useQuery<IReview>(["review", reviewId], () => getOneReview(reviewId!), {
    onSuccess(data) {
      setImagePreview(data?.reviewImg!); // Query 일정시간동안 호출 안함 .그래서 해당부분 안찍힘?
      setValue("description", data?.description!);
    },
    enabled: mode === "UPDATE",
  });

  // Mutation
  const reviewMutation = useMutation(mode === "CREATE" ? createReview : editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["review", reviewId]);
    },
  });
  const userMutation = useMutation(getUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  // Util
  const checkInProgress = (greenCrews: UserGreenCrew[]) => {
    setInProgressGreenCrew(greenCrews?.filter(greenCrew => greenCrew.inProgress! === 1));
    setDoneGreenCrew(greenCrews?.filter(greenCrew => greenCrew.inProgress! === 0));
    console.log(Boolean(doneGreenCrews));
  };

  // Handle
  const onvalid = async (data: IReviewContent) => {
    const formData = new FormData();
    formData.append("description", data.description);
    switch (mode) {
      case "CREATE":
        formData.append("title", data.title);
        const createDay = dayjs(new Date());
        formData.append("createAt", createDay.toString());
        formData.append("file", uploadImg);
        await reviewMutation.mutate(formData);
        await userMutation.mutate();

        navigate("/review");
        break;

      case "UPDATE":
        if (data.title === "") formData.append("title", review?.title!);
        else formData.append("title", data.title);

        formData.append("userId", user?.id!.toString()!);
        formData.append("reviewId", reviewId!.toString());

        if (uploadImg) {
          // 사진파일이 변했다면 ,file 객체 전달
          formData.append("file", uploadImg);
        } else {
          // 사진파일이 그대로라면, 이미지 url 전달

          formData.append("imageUrl", review?.reviewImg! as string);
        }

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
    setIsReviewCancelModal(true);
  };

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(window.URL.createObjectURL(file as File));

      setUploadImg(file);
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
            <Desc style={{ fontSize: "14px" }}>완료한 모임만 후기를 작성할 수 있습니다!</Desc>
          </ReviewSubTitle>
        </TitleBox>
        {mode === "CREATE" && doneGreenCrews && (
          <SelectInput as="select" required height={40} {...register("title")}>
            <Option value="">풀빛마실 모임을 선택해주세요!</Option>
            {doneGreenCrews?.map(doneGreenCrew => (
              <Option>{doneGreenCrew?.title}</Option>
            ))}
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
          <RegisterBtn>{mode === "UPDATE" ? "수정하기" : "등록하기"} </RegisterBtn>
          <CloseBtn className="cancle" type="button" onClick={handleClickCancel}>
            취소
          </CloseBtn>
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
  z-index: 1;
  width: 600px;
  display: flex;
  max-height: 800px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  @media screen and (max-width: 764px) {
    padding: 20px;
    width: 90%;
    height: 70%;
  }
  @media screen and (max-height: 1000px) {
    height: 90%;
  }
`;
const TitleBox = styled(Box)`
  flex-direction: column;
  margin-bottom: 30px;

  @media screen and (max-width: 764px) {
    margin-bottom: 20px;
  }
`;

const ReviewSubTitle = styled(SubTitle)`
  text-align: center;
  margin-top: 15px;
`;

const Input = styled.input<{ height: number }>`
  width: 550px;
  height: ${props => props.height}px;
  border: solid 1px #a7a7a7;

  @media screen and (max-width: 764px) {
    width: 100%;
  }
`;
const SelectInput = styled(Input)`
  font-size: 18px;
  color: ${props => props.theme.accentColor};
  padding: 0px 10px;
  margin-bottom: 20px;
  @media screen and (max-width: 764px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
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
  margin-bottom: 30px;
  @media screen and (max-width: 764px) {
    width: 100%;
    height: 200px;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  justify-content: center;
`;
const ImgBox = styled(Box)`
  /* box-sizing: border-box; */
  width: 100%;
  height: 155px;
  overflow: hidden;
  margin: 0 auto;
  cursor: pointer;
  transition: background-color 0.4s ease;
  border: dashed 2px ${props => props.theme.weekColor};
  margin-bottom: 20px;

  &:hover {
    background-color: #f5fffa;
  }
  @media screen and (max-width: 764px) {
    width: 100%;
    margin-bottom: 10px;
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

const RegisterBtn = styled(MainBtn)`
  @media screen and (max-width: 764px) {
    width: 100px;
    height: 35px;
  }
`;

const CloseBtn = styled(RegisterBtn)`
  margin-left: 20px;
  background-color: ${props => props.theme.dangerColor};
  &:hover {
    background-color: #cc5e43;
  }

  @media screen and (max-width: 764px) {
    margin-left: 10px;
  }
`;
