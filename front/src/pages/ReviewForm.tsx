import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getReviews, uploadReview } from "@api/api";
import { IReview, IReviewContent } from "src/types/review";
import { useRecoilValue } from "recoil";
import { userAtom } from "@atom/user";
import { useNavigate } from "react-router-dom";

export default function ReviewForm() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IReviewContent>();

  //확인버튼 누를때 현재시간 생성후 넘겨줌,
  const handleSubmitReview = handleSubmit(data => {
    // post 요청
    const newData: IReview = {
      title: data.title,
      description: data.description,
      createAt: new Date(),
    };
    console.log(newData);
    uploadReview(newData);
  });

  return (
    <FormWrap onSubmit={handleSubmitReview}>
      <TitleContainer>
        <Title>플로깅</Title>
        <SubTitle>
          함께한
          <Accent> 생생한 경험</Accent>를 공유해주세요!
        </SubTitle>
      </TitleContainer>

      {/* <label htmlFor="pet-select">Choose a pet:</label>

          <select
            id="pet-select"
            {...register("pets", {
              required: true,
            })}
          >
            <option value="">--Please choose an option--</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select> */}

      <ReviewInput
        style={{ height: "60px" }}
        placeholder="제목을 입력해주세요."
        {...register("title", {
          required: { value: true, message: "제목을 입력해주세요." },
        })}
      />

      <ReviewInput
        placeholder="내용을 입력해주세요."
        {...register("description", {
          required: { value: true, message: "내용을 입력해주세요." },
        })}
      />

      <ButtonContainer>
        <Button type="submit">등록하기</Button>
        <Button onClick={() => navigate("/review")}>취소</Button>
      </ButtonContainer>
    </FormWrap>
  );
}

const FormWrap = styled.form`
  position: relative;
  padding: 0 450px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url("/assets/images/walk.jpg");
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
`;
