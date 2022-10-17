import { changePassword } from "@api/user";
import { userAtom } from "@atom/user";
import { Box, Container, Title, Wrapper, SubTitle, Desc, Row } from "@style/Layout";
import { useRecoilState, useRecoilValue } from "recoil";
import PasswordChangeModal from "@components/modal/PasswordChangeModal";
import { useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import GreenCrewList from "./GreenCrewList";
import ReviewList from "./ReviewList";
export interface UserPasswordProps {
  isPasswordChange: boolean;
  setIsPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserInfo() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  const { menu } = useParams();
  const [isPasswordChange, setIsPasswordChange] = useState(false);

  const handleClickChangePassword = () => {
    // changePassword()
    if (user?.social === 0) {
      setIsPasswordChange(true);
    } else {
      alert("비밀번호 변경 불가합니다.");
    }
  };
  console.log(menu);
  return (
    <MyPageWrapper>
      <MyPageContainer>
        <ProfileBox>
          <MyPageTitle>마이 페이지</MyPageTitle>
          <Img src="/assets/icon/user/user_img.svg" />
          <NameBox>
            <Name>{user?.name}</Name>
            <Icon src={`/assets/icon/${user?.social}_logo.png`} />
          </NameBox>
          <Email>{user?.email}</Email>
          <MenuBox>
            <Link to="/mypage/review">
              <Menu className={menu === "review" ? "active" : "normal"}>리뷰</Menu>
            </Link>
            <Link to="/mypage/greenCrew">
              <Menu className={menu === "greenCrew" ? "active" : "normal"}>풀빛마실</Menu>
            </Link>
          </MenuBox>
        </ProfileBox>
        <ContentBox>
          <GreenCrewList greenCrews={user?.greenCrews}></GreenCrewList>
          <ReviewList reviews={user?.reviews}></ReviewList>
        </ContentBox>
      </MyPageContainer>
      <PasswordChangeModal
        setIsPasswordChange={setIsPasswordChange}
        isPasswordChange={isPasswordChange}
      ></PasswordChangeModal>
      <button onClick={handleClickChangePassword}>비밀번호 변경</button>
    </MyPageWrapper>
  );
}

const MyPageWrapper = styled(Wrapper)`
  background-image: url("/assets/images/register_img.jpg");
`;
const MyPageTitle = styled(Title)`
  position: absolute;
  top: 40px;
`;
const ProfileBox = styled(Box)`
  background-image: url("/assets/images/mypage/profile_bg.jpg");
  width: 100%;
  height: 35%;
  flex-direction: column;
  position: relative;
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
`;
const ContentBox = styled(Box)`
  width: 100%;
  height: 65%;
  padding: 90px;
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
  position: absolute;

  bottom: 0px;
`;
const Menu = styled.button`
  font-size: 18px;
  width: 200px;
  height: 50px;
  &.normal {
    background-color: ${props => props.theme.weekColor};
  }
  &.active {
    background-color: ${props => props.theme.mainColor};
  }
`;
const MyPageContainer = styled(Container)`
  flex-direction: column;
  width: 800px;
  height: 100%;
  background-color: white;
`;
