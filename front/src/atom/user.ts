import { atom, selector } from "recoil";
import { User } from "@type/user";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLoginSelector = selector({
  key: "isLogin",
  get: ({ get }) => {
    const user = get(userAtom);
    const checkLogin = sessionStorage.getItem("userToken") && user?.token ? true : false;
    return checkLogin;
  },
});
export const userAtom = atom<User | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const isPasswordFindModalAtom = atom({
  key: "isPasswordFindModal",
  default: false,
});
