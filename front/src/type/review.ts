export interface IReview {
  name: string;
  userId?: number; // 작성자
  reviewId?: number;
  title: string;
  description: string;
  createAt?: Date;
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}
