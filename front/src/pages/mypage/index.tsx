import { changePassword, getUser } from "@api/user";
import { userAtom } from "@atom/user";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import { useRecoilState, useRecoilValue } from "recoil";
import PasswordChangeModal from "@components/modal/PasswordChangeModal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, useParams, useMatch } from "react-router-dom";
import GreenCrewList from "./GreenCrewList";
import ReviewList from "./ReviewList";
import Home from "./Home";
import { AnimatePresence } from "framer-motion";
import UserEditNav from "@components/UserEditNav";
import NameChangeModal from "@components/modal/NameChangeModal";
import ReviewDeleteModal from "@components/modal/ReviewDeleteModal";
import { ReviewDeleteIdAtom } from "@atom/atom";
import { useQuery } from "@tanstack/react-query";
import { User } from "@type/user";
export interface UserPasswordProps {
  setIsPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyPage() {
  const [isEdit, setIsEdit] = useState(false);
  const { menu, target } = useParams();
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [isNameChange, setIsNameChange] = useState(false);
  const [reviewDelId, setReviewDelId] = useRecoilState(ReviewDeleteIdAtom);
  const { data: user } = useQuery<User | undefined>(["user"], getUser, {
    onSuccess(data) {
      console.log("mypage query 작동 완료", data);
    },
  });
  const handleClickChangePassword = () => {
    // changePassword()
    if (user?.social === "origin") {
      setIsPasswordChange(true);
    } else {
      alert("비밀번호 변경 불가합니다.");
    }
  };
  useEffect(() => {
    if (target === "password") {
      setIsPasswordChange(true);
    } else if (target === "name") {
      setIsNameChange(true);
    }
  }, [target]);
  console.log("-------------", menu, target);
  return (
    <MyPageWrapper>
      <MyPageContainer>
        <MyPageTitle>마이 페이지</MyPageTitle>
        <ProfileBox>
          <Img src="/assets/icon/user/user_img.svg" />
          <NameBox>
            <Name>{user?.name}</Name>
            <Icon src={`/assets/icon/${user?.social}_logo.png`} />
          </NameBox>
          <Email>{user?.email}</Email>
        </ProfileBox>
        <ContentBox>
          <MenuBox>
            <Link to="/mypage/home">
              <Menu className={menu === "home" ? "active" : "normal"}>홈</Menu>
            </Link>
            <Link to="/mypage/review">
              <Menu className={menu === "review" ? "active" : "normal"}>리뷰</Menu>
            </Link>
            <Link to="/mypage/greencrew">
              <Menu className={menu === "greencrew" ? "active" : "normal"}>풀빛마실</Menu>
            </Link>
          </MenuBox>
          {menu === "home" && <Home user={user!} />}
          {menu === "greencrew" && <GreenCrewList greenCrews={user?.greenCrews}></GreenCrewList>}
          {menu === "review" && <ReviewList reviews={user?.reviews}></ReviewList>}
        </ContentBox>
        <EditInfoBtn onClick={() => setIsEdit(cur => !cur)}>정보 수정</EditInfoBtn>
        <AnimatePresence>{isEdit && <UserEditNav setIsEdit={setIsEdit} />}</AnimatePresence>
      </MyPageContainer>
      <AnimatePresence>
        <PasswordChangeModal
          isPasswordChange={isPasswordChange}
          setIsPasswordChange={setIsPasswordChange}
          menu={menu}
        ></PasswordChangeModal>

        <NameChangeModal
          setIsNameChange={setIsNameChange}
          isNameChange={isNameChange}
          name={user?.name!}
          menu={menu}
        ></NameChangeModal>
        {reviewDelId && <ReviewDeleteModal reviewId={reviewDelId} />}
      </AnimatePresence>
    </MyPageWrapper>
  );
}

const MyPageWrapper = styled(Wrapper)`
  /* height: auto; */
  background-image: url("/assets/images/register_img.jpg");
  overflow-y: scroll;
`;
const MyPageTitle = styled(Title)``;
const ProfileBox = styled(Box)`
  width: 100%;
  height: 35%;
  flex-direction: column;
  position: relative;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
`;
const ContentBox = styled(Box)`
  flex-direction: column;
  width: 600px;
  height: auto;
  min-height: 640px;
  align-items: center;
  border-radius: 20px;
  justify-content: flex-start;
`;
const NameBox = styled(Row)`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;
const Name = styled(Title)`
  font-size: 24px;
  color: ${props => props.theme.textColor};
`;
const Icon = styled.img`
  margin-left: 5px;
  width: 24px;
  height: 24px;
`;
const Email = styled(Desc)`
  font-size: 22px;
`;
const MenuBox = styled(Box)`
  bottom: 0px;
`;
const Menu = styled.button`
  font-size: 24px;
  width: 150px;
  height: 50px;
  border-radius: 20px 20px 0px 0px;
  box-shadow: 2px 0px 7px rgba(0, 0, 0, 0.2);
  &.normal {
    background-color: ${props => props.theme.weekColor};
  }
  &.active {
    background-color: ${props => props.theme.mainColor};
  }
`;
const MyPageContainer = styled(Container)`
  position: relative;
  flex-direction: column;
  width: 600px;
  height: 100%;
`;

const EditInfoBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 40px;
  top: 20px;
  right: 20px;
`;
