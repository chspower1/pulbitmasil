export interface IReview {
  id?: number; // 작성자
  title: string;
  description: string;
  createAt: Date;
}

export interface IReviewContent extends Omit<IReview, "createAt"> {}
