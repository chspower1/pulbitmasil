import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userAtom } from "@atom/user";

interface UserNavProps {
  setIsUserNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserNav({ setIsUserNav }: UserNavProps) {
  const userNavMenus = ["userInfo", "myGreenStroll", "logout"];
  const userNavKorMenus = ["계정 정보", "나의 풀빛마실", "로그아웃"];
  const [user, setUser] = useRecoilState(userAtom);

  const onClickLogout = async () => {
    sessionStorage.removeItem("userToken");
    setIsUserNav(false);
    setUser(null);
  };

  return (
    <UserNavWrapper>
      {userNavMenus.map((menu, index) => (
        <Link key={index} to={menu === "logout" ? "" : menu}>
          {menu === "logout" ? (
            <Button onClick={onClickLogout}>{userNavKorMenus[index]}</Button>
          ) : (
            <Button>{userNavKorMenus[index]}</Button>
          )}
        </Link>
      ))}
    </UserNavWrapper>
  );
}

const UserNavWrapper = styled.div`
  position: absolute;
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
