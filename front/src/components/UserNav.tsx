import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userAtom } from "@atom/user";
import { isLogoutModalAtom } from "@atom/atom";
import { UserNavProps } from "./layout/Nav";

export default function UserNav({ setIsUserNav }: UserNavProps) {
  const userNavMenus = ["userInfo", "myGreenStroll", "logout"];
  const userNavKorMenus = ["계정 정보", "나의 풀빛마실", "로그아웃"];
  const setIsLogoutModal = useSetRecoilState(isLogoutModalAtom);

  const handleClickLogout = async () => {
    setIsLogoutModal(true);
    setIsUserNav(false);
  };

  return (
    <UserNavWrapper>
      {userNavMenus.map((menu, index) => (
        <Link key={index} to={menu === "logout" ? "" : menu}>
          {menu === "logout" ? (
            <Button onClick={handleClickLogout}>{userNavKorMenus[index]}</Button>
          ) : (
            <Button>{userNavKorMenus[index]}</Button>
          )}
        </Link>
      ))}
    </UserNavWrapper>
  );
}

const UserNavWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 0px;
  top: 70px;
  background: white;
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Button = styled.button`
  min-width: 180px;
`;
