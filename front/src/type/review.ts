export interface IReview {
  name?: string; // 백엔드로 보낼때는 name
  userName?: string; // 백엔드에서 받을때는 userName
  userId?: number; // 작성자
  reviewId?: number;
  title: string;
  description: string;
  createAt?: Date;
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}
