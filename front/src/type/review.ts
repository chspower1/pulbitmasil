export enum FormMode {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface IReview {
  name?: string;
  userId?: number; // 작성자
  reviewId?: number;
  description: string;
  title: string;
  createAt?: Date;
  area?: string;
  reviewImg?: File[] | string; //백에서 받을때 image 경로
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}

export interface IReviewUpdateData {
  type: "CREATE" | "UPDATE";
  userId?: number;
  reviewId?: number;
}
