export interface postsTypes {
  title: string;
  body: string;
  id: string;
  timestamp: any;
  author: string;
  userId: string;
  dashboard: boolean;
}

export interface AddPostTypes {
  title: string;
  body: string;
  author: string;
  userId: string;
}

export interface UserTypes {
    displayName: string;
    email: string;
    uid: string;
    photoUrl: string;
}