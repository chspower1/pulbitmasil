import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});
interface CurUser {
  email: string;
  name: string;
}
export const curUser = atom<CurUser | null>({
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
