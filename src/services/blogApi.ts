import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import {AddPostTypes} from '../config/types'

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getPosts: builder.query({
      queryFn: async (): Promise<any> => {
        try {
          const blogRef = collection(db, "blogs");
          const data = await getDocs(blogRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return { data: filteredData };
        } catch (error) {
          return { error };
        }
      },
    }),
    getSinglePost: builder.query({
      queryFn: async (id: string): Promise<any> => {
        try {
          const data = await getDoc(doc(db, "blogs", id));
          return { data: data.data(), id: data.id };
        } catch (error) {
          return { error };
        }
      },
    }),
    addPost: builder.mutation({
      async queryFn(data: AddPostTypes): Promise<any> {
        try {
          const docref = await addDoc(collection(db, "blogs"), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return {
            data: docref.id,
            status: true,
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    deletePost: builder.mutation({
      async queryFn(id: string): Promise<any> {
        try {
          await deleteDoc(doc(db, "blogs", id));
          return { status: "ok" };
        } catch (error) {
          return { error };
        }
      },
    }),
    getMyPosts: builder.query({
      queryFn: async (userId: string): Promise<any> => {
        try {
          const blogRef = query(collection(db, 'blogs'), where("userId", "==", userId));
          const data = await getDocs(blogRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return { data: filteredData };
        } catch (error) {
          return { error };
        }
      },
    }),
    updateMyBLog: builder.mutation({
      async queryFn(data): Promise<any> {
        try {
          await updateDoc(doc(db, "blogs", data.id), {
            ...data,
          })
          return { status: "ok" };
        } catch (error) {
          return { error };
        }
      }
    }),
  //   updateEmail: builder.mutation({
  //     async queryFn(data): Promise<any> {
  //       try {
  //         updateEmail(auth.currentUser, data).then(() => {
  //           console.log('updated')
  //         }).catch((error) => {
  //           console.log(error)
  //         })
  //       } catch (error) {
  //         return { error };
  //       }
  //     }
  //   }),
  //   updateName: builder.mutation({
  //     async queryFn(data): Promise<any> {
  //       try {
  //         updateProfile(auth.currentUser, {
  //           displayName: data
  //         })
  //       } catch (error) {
  //         return { error };
  //       }
  //     }
  //   })
  }),
});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useDeletePostMutation,
  useGetSinglePostQuery,
  useGetMyPostsQuery,
  // useUpdateEmailMutation,
  // useUpdateNameMutation,
  useUpdateMyBLogMutation
} = blogApi;
