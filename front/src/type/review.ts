export interface IReview {
  name?: string;
  userId?: number; // 작성자
  reviewId?: number;
  description: string;
  createAt?: Date;
  reviewImg?: File[] | string; //백에서 받을때 image 경로
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}
