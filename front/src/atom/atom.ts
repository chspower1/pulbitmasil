import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { userAtom } from "./user";

const { persistAtom } = recoilPersist();


export const isLoginModalAtom = atom({
  key: "isLoginModal",
  default: false,
});
export const isLogoutModalAtom = atom({
  key: "isLogoutModal",
  default: false,
});
export const isWelcomeModalAtom = atom({
  key: "isWelcomeModal",
  default: false,
});

//Review
export const isReviewDeleteAtom = atom<number | null>({
  key: "isReviewDeleteModal",
  default: null,
});

export const isReviewCancelAtom = atom({
  key: "isReviewCancelModal",
  default: false,
});
