import { getUser } from "@api/user";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row, MainBtn } from "@style/Layout";
import { useRecoilState } from "recoil";
import PasswordChangeModal from "@components/modal/PasswordChangeModal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const { data: user } = useQuery<User | undefined>(["user"], getUser);
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

  return (
    <MyPageWrapper>
      <MyPageContainer>
        <TopBox>
          <MyPageTitle>마이 페이지</MyPageTitle>
          <EditBtn onClick={() => setIsEdit(cur => !cur)} width="100px">
            정보 수정
          </EditBtn>
        </TopBox>
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
            <Menu className={menu === "home" ? "active" : "normal"} onClick={() => navigate("/mypage/home")}>
              홈
            </Menu>
            <Menu className={menu === "review" ? "active" : "normal"} onClick={() => navigate("/mypage/review")}>
              리뷰
            </Menu>
            <Menu className={menu === "greencrew" ? "active" : "normal"} onClick={() => navigate("/mypage/greencrew")}>
              풀빛마실
            </Menu>
          </MenuBox>
          {menu === "home" && <Home user={user!} />}
          {menu === "greencrew" && <GreenCrewList greenCrews={user?.greenCrews}></GreenCrewList>}
          {menu === "review" && <ReviewList reviews={user?.reviews}></ReviewList>}
        </ContentBox>

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
  flex-direction: column;
  justify-content: flex-start;
  /* height: auto; */
`;

const MyPageTitle = styled(Title)`
  font-size: 32px;
  color: ${props => props.theme.accentColor};
  width: 500px;
  text-align: center;
`;
const TopBox = styled(Box)`
  width: 100%;
  @media screen and (max-width: 768px) {
    width: 90%;
    /* flex-direction: column; */
    position: relative;
  }
`;

const ProfileBox = styled(Box)`
  width: 100%;
  height: 35%;
  flex-direction: column;
  position: relative;
  margin: 15px 0;
  pading: 0 10px;
  @media screen and (max-width: 768px) {
    width: 90%;
    /* flex-direction: column; */
  }
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
const ContentBox = styled(Box)`
  flex-direction: column;
  width: 600px;
  height: auto;
  min-height: 640px;
  align-items: center;
  border-radius: 20px;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    width: 80%;
    /* flex-direction: column; */
  }
`;
const NameBox = styled(Row)`
  margin-top: 10px;
  justify-content: center;
  align-items: center;

  /* @media screen and (max-width: 768px) {
    font-size
  } */
`;
const Name = styled(Title)`
  font-size: 24px;
  color: ${props => props.theme.textColor};

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
const Icon = styled.img`
  margin-left: 5px;
  width: 24px;
  height: 24px;

  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
const Email = styled(Desc)`
  font-size: 22px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
const MenuBox = styled(Box)`
  bottom: 0px;
  width: 95%;

  @media screen and (max-width: 768px) {
    width: 90%;
    /* flex-direction: column; */
    margin: 0 auto;
  }
`;
const Menu = styled.button`
  font-size: 20px;
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

  @media screen and (max-width: 768px) {
    height: 25px;
    font-size: 16px;
  }
`;
const MyPageContainer = styled(Container)`
  position: relative;
  flex-direction: column;
  width: 600px;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 100%;
    /* flex-direction: column; */
  }
`;
const EditBtn = styled(MainBtn)`
  z-index: 1;
  position: absolute;
  top: 35px;
  right: 20px;
  font-size: 16px;
  width: 100px;
  height: 40px;

  @media screen and (max-width: 768px) {
    position: absolute;
    font-size: 14px;
    width: 80px;
    height: 40px;
    top: 50px;
    padding: 0px;

    /* flex-direction: column; */
  }
`;
