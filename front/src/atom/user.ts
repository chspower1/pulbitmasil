import { atom } from "recoil";
import { User } from "@type/user";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userAtom = atom<User | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
