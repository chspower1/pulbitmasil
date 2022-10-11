import { IDodream } from "../type/dodream";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isDodreamDetalModalAtom = atom({
  key: "dodreamDetailModal",
  default: false,
});
export const selectedDodreamAtom = atom<IDodream | null>({
  key: "selectedDodream",
  default: null,
});
