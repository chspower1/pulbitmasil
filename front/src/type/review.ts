export interface Review {
  title: string;
  description: string;
  createAt: Date;
}

export interface ReviewContent extends Omit<Review, "createAt"> {}
