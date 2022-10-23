import { IReview } from "@type/review";
import { atom, selector } from "recoil";

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
export const ReviewDeleteIdAtom = atom<number | null>({
  key: "reviewDeleteId",
  default: null,
});

export const isReviewCancelAtom = atom({
  key: "isReviewCancelModal",
  default: false,
});

export const isRegisterModalAtom = atom({
  key: "isRegisterModal",
  default: false,
});
