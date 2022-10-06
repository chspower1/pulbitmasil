import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLoginState = selector({
  key: "isLogin",
  get: ({ get }) => {
    const curUser = get(curUserAtom);
    const checkLogin = sessionStorage.getItem("userToken") && curUser?.token ? true : false;
    return checkLogin;
  },
});
interface CurUser {
  email: string;
  name: string;
  token: string;
}
export const curUserAtom = atom<CurUser | null>({
  key: "curUser",
  default: null,
});
export const userAtom = atom({
  key: "user",
  default: {
    email: "",
    name: "",
  },
});
