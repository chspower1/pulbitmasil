import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "@components/layout/Nav";
import Home from "./Home";
import About from "./About";
import Register from "./Register";
import NaverAuth from "./Auth/NaverAuth";
import KakaoAuth from "./Auth/KakaoAuth";
import Dodream from "./Dodream";
import MyPage from "./mypage";
import GreenCrew from "./GreenCrew";
import WelcomeModal from "@components/modal/WelcomeModal";
import Review from "./review";
import CreateReview from "./review/CreateReview";
import UpdateReview from "./review/UpdateReview";
import Guide from "./Guide";
import Loading from "@components/Loading";

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <WelcomeModal />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dodream" element={<Dodream />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:reviewId" element={<Review />} />
          <Route path="/review/write" element={<CreateReview />} />
          <Route path="/review/edit/:reviewId" element={<UpdateReview />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/:menu" element={<MyPage />} />
          <Route path="/mypage/:menu/edit/:target" element={<MyPage />} />
          <Route path="/GreenCrew" element={<GreenCrew />} />
          <Route path="/GreenCrew/:area" element={<GreenCrew />} />
          <Route path="/auth/naver/callback" element={<NaverAuth />} />
          <Route path="/auth/kakao/callback" element={<KakaoAuth />} />
        </Routes>
      </Suspense>
      {/* <ScrollBtn /> */}
    </BrowserRouter>
  );
}
