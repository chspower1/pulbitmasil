import React from "react";
import { useRecoilState } from "recoil";
import { AAtom } from "../atom";
export default function Home() {
    const [a, setA] = useRecoilState(AAtom);
    return <div>Home</div>;
}
