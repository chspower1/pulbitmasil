import axios from "axios";
import { IReview } from "src/types/review";

const BASE_URL = "http://localhost:5001";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function createReview(contents: IReview) {
  const bodyData = JSON.stringify(contents);
  console.log(`%cPOST 요청 ${BASE_URL + "/user/review"}`, "color: #a25cd1;");
  console.log(bodyData);

  return axiosInstance.post(`review/create`, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

export async function editReview(contents: IReview) {
  const bodyData = JSON.stringify(contents);
  console.log(`%cPUT 요청 ${BASE_URL}/review/${contents.reviewId}`, "color: #a25cd1;");
  console.log(bodyData);

  return axiosInstance.put(`review/${contents.reviewId}`, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
    params: {
      reviewId: contents.reviewId,
    },
  });
}

export async function getReviews() {
  console.log(`%cGET 요청 ${BASE_URL}/review`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`review`);
  return data;
}

export async function getOneReview(reviewId: number) {
  console.log(`%cGET 요청 ${BASE_URL}/review/${reviewId}`, "color: #a25cd1;");
  const { data } = await axiosInstance.get(`review/${reviewId}`, {
    params: {
      reviewId,
    },
  });
  return data;
}

export async function deleteReview(contents: IReview) {
  const bodyData = { userId: contents.userId };

  console.log(`%cDELETE 요청 ${BASE_URL}/review/${contents.reviewId}`, "color: #a25cd1;");
  return axiosInstance.put(`review/${contents.reviewId}`, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
    params: {
      reviewId: contents.reviewId,
    },
  });
}
