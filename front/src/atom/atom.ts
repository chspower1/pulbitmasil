import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLoginSelector = selector({
  key: "isLogin",
  get: ({ get }) => {
    const curUser = get(curUserAtom);
    const checkLogin = sessionStorage.getItem("userToken") && curUser?.token ? true : false;
    return checkLogin;
  },
});
export const isLoginModalAtom = atom({
  key: "isLoginModal",
  default: false,
});
interface CurUser {
  email: string;
  name: string;
  token: string;
}
export const curUserAtom = atom<CurUser | null>({
  key: "curUser",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
