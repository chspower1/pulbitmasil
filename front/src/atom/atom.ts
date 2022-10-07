import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { userAtom } from "./user";

const { persistAtom } = recoilPersist();

export const isLoginSelector = selector({
  key: "isLogin",
  get: ({ get }) => {
    const curUser = get(userAtom);
    const checkLogin = sessionStorage.getItem("userToken") && curUser?.token ? true : false;
    return checkLogin;
  },
});
export const isLoginModalAtom = atom({
  key: "isLoginModal",
  default: false,
});
