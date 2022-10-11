import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const dodreamAtom = atom({
  key: "dodream",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
export const isDodreamDetalModalAtom = atom({
  key: "dodreamDetailModal",
  default: false,
});
