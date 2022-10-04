import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
interface A {
    name: string;
    age: number;
}
const { persistAtom } = recoilPersist();
export const AAtom = atom<A>({
    key: "A",
    default: {
        name: "",
        age: 20,
    },
    effects_UNSTABLE: [persistAtom],
});
