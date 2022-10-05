import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});
