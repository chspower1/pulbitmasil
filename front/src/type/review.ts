export interface IReview {
  name?: string;
  userId?: number; // 작성자
  reviewId?: number;
  description: string;
  createAt?: Date;
  reviewImg?: any;
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}
