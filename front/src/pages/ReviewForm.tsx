import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { uploadReview } from "@api/api";
import { Review } from "src/types/review";
import { useRecoilValue } from "recoil";
import { userAtom } from "@atom/user";
import { useNavigate } from "react-router-dom";

interface ReviewForm {
  contents: string;
}
export default function ReviewForm() {
  const [runningDate, setRunningDate] = useState(new Date());
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ReviewForm>();

  //확인버튼 누를때 현재시간 생성후 넘겨줌,
  const handleClickReview = () => {
    // post 요청
    const data: Review = {
      name: user!.name, // 사용자 닉네임
      email: user!.email, // 이메일주소
      writeDate: new Date(), //
      createDate: new Date(),
    };
    uploadReview(data);
  };

  return (
    <ReviewWrap>
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
        placeholder="후기를 적어주세요."
        {...register("contents", {
          required: { value: true, message: "내용을 입력해주세요." },
        })}
      />

      <ButtonContainer>
        <Button type="submit" onClick={handleClickReview}>
          등록하기
        </Button>
        <Button onClick={() => navigate("/review")}>취소</Button>
      </ButtonContainer>
    </ReviewWrap>
  );
}

const ReviewWrap = styled.div`
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
  width: 100%;
  height: 400px;
  font-size: 16px;
  padding: 20px 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
`;
