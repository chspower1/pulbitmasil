import axios from "axios";
import { IReview } from "@type/review";
import { axiosInstance, BASE_URL } from "./axiosInstance";


export async function createReview(contents: FormData) {
  return await axiosInstance.post(`review/create`, contents, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

export async function editReview(contents: FormData) {
  const reviewId = contents.get("reviewId");
  return axiosInstance.put(`review/${reviewId}`, contents, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

export async function getReviews() {
  const { data } = await axiosInstance.get(`review`);
  return data;
}

export async function getOneReview(reviewId: number) {
  const { data } = await axiosInstance.get(`review/${reviewId}`, {
    params: {
      reviewId,
    },
  });
  return data[0];
}

export async function deleteReview({ reviewId, userId }: { reviewId: number; userId: number }) {
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
