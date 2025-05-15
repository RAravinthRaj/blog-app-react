export interface IPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[] | null;
  likes: number[];
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  username: string;
}
