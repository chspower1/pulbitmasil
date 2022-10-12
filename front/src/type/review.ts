export interface IReview {
  userName?: string; // 백엔드에서 받을때는 userName
  userId?: number; // 작성자
  reviewId?: number;
  description: string;
  createAt?: Date;
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}
