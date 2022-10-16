import axios from "axios";
import { IReview } from "@type/review";
import { axiosInstance, BASE_URL } from "./axiosInstance";

//image 테스트
export async function createReview(contents: FormData) {
  console.log(`%cPOST 요청 ${BASE_URL + "review/create"}`, "color: #a25cd1;");
  console.log(contents);
  // console.log(contents.get("file"));

  return await axiosInstance.post(`review/create`, contents, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// export async function editReview(contents: IReview) {
//   const bodyData = JSON.stringify(contents);
//   // console.log(`%cPUT 요청 ${BASE_URL}/review/${contents.reviewId}`, "color: #a25cd1;");
//   // console.log(bodyData);

//   return axiosInstance.put(`review/${contents.reviewId}`, bodyData, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
//     },
//     params: {
//       reviewId: contents.reviewId,
//     },
//   });
// }

export async function editReview(contents: FormData) {
  const reviewId = contents.get("reviewId");
  console.log(`%cPUT 요청 ${BASE_URL}/review/${reviewId}`, "color: #a25cd1;");

  return axiosInstance.put(`review/${reviewId}`, contents, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
    params: {
      reviewId,
    },
  });
}

export async function getReviews() {
  // console.log(`%cGET 요청 ${BASE_URL}/review`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`review`);
  console.log("get", data);
  return data;
}

export async function getOneReview(reviewId: number) {
  // console.log(`%cGET 요청 ${BASE_URL}/review/${reviewId}`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`review/${reviewId}`, {
    params: {
      reviewId,
    },
  });
  return data[0];
}

export async function deleteReview({ reviewId, userId }: { reviewId: number; userId: number }) {
  // console.log(`%cDELETE 요청 ${BASE_URL}/review/${reviewId}`, "color: #a25cd1;");
  return axiosInstance.delete(`review/${reviewId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
    data: { userId },
    params: {
      reviewId,
    },
  });
}
