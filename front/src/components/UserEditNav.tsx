import {  useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link,  useNavigate, useParams } from "react-router-dom";
import { userAtom } from "@atom/user";
import { isLogoutModalAtom } from "@atom/atom";

import { motion } from "framer-motion";

interface UserEditNavProps {}
export default function UserEditNav({ setIsEdit }: { setIsEdit: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { menu, target } = useParams();
  const userNavMenus = [`/mypage/${menu}/edit/password`, `/mypage/${menu}/edit/name`];
  const userNavKorMenus = ["비밀번호 수정", "이름 수정"];
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const handleClickChangePassword = () => {
    // changePassword()
    if (user?.social !== "origin") {
      alert("소셜로그인 회원은 비밀번호 수정이 불가합니다.");
    } else {
      navigate(`mypage/${menu}`);
    }
  };
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  return (
    <UserNavWrapper variants={variants} initial="hidden" animate="visible">
      {userNavMenus.map((menu, index) => (
        <Link key={index} to={menu}>
          <Button onClick={() => setIsEdit(false)}>
            <BtnText variants={item}>{userNavKorMenus[index]}</BtnText>
          </Button>
        </Link>
      ))}
    </UserNavWrapper>
  );
}

const UserNavWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: 75px;
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 40px;
    top: 130px;

    /* flex-direction: column; */
  }
`;

const Button = styled.button`
  min-width: 180px;
  &:not(last-child) {
    border-bottom: solid 1px ${props => props.theme.accentColor};
  }
`;
const BtnText = styled(motion.p)``;
