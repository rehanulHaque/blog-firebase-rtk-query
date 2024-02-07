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

export interface ImportMeta {
  env: {
    VITE_APP_FIREBASE_API: string;
    VITE_APP_FIREBASE_AUTH_DOMAIN: string;
    VITE_APP_FIREBASE_PROJECT_ID: string;
    VITE_APP_FIREBASE_STORAGE_BUCKET: string;
    VITE_APP_FIREBASE_MESSAGE_SENDER_ID: string;
    VITE_APP_FIREBASE_APP_ID: string;
  };
}