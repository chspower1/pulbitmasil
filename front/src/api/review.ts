import axios from "axios";
import { IReview } from "@type/review";

const BASE_URL = `http://${window.location.hostname}:5001`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

//image 테스트
export async function createReview(contents: FormData) {
  console.log(`%cPOST 요청 ${BASE_URL + "user/review"}`, "color: #a25cd1;");
  console.log(contents);
  console.log(contents.get("imageUrl"));

  return axiosInstance.post(`review/create`, contents, {
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

export async function editReview(contents: FormData, reviewId: number) {
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
  // console.log(data);
  return data;
}

export async function getOneReview(reviewId: number) {
  // console.log(`%cGET 요청 ${BASE_URL}/review/${reviewId}`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`review/${reviewId}`, {
    params: {
      reviewId,
    },
  });
  return data;
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
