import { changePassword } from "@api/user";
import { isPasswordChangeModalAtom, userAtom } from "@atom/user";
import { Wrapper as UserInfoWrapper } from "@style/Layout";
import { useRecoilState, useRecoilValue } from "recoil";
import PasswordChangeModal from "@components/modal/PasswordChangeModal";
import { useState } from "react";
export interface UserPasswordProps {
  isPasswordChange: boolean;
  setIsPasswordChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserInfo() {
  const user = useRecoilValue(userAtom);
  console.log(user);

  const [isPasswordChange, setIsPasswordChange] = useState(false);

  const handleClickChangePassword = () => {
    // changePassword()
    if (user?.social === 0) {
      setIsPasswordChange(true);
    } else {
      alert("비밀번호 변경 불가합니다.");
    }
  };

  return (
    <UserInfoWrapper>
      <button onClick={handleClickChangePassword}>비밀번호 변경</button>
      <PasswordChangeModal
        setIsPasswordChange={setIsPasswordChange}
        isPasswordChange={isPasswordChange}
      ></PasswordChangeModal>
    </UserInfoWrapper>
  );
}
