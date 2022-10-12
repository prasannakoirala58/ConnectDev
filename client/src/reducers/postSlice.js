import { createSlice, current } from '@reduxjs/toolkit';
import {
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addPost,
  getPost,
  addComment,
  deleteComment,
} from './postThunk';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    // GET all posts
    [getPosts.pending]: (state) => {
      return { loading: true };
    },

    [getPosts.fulfilled]: (state, { payload }) => {
      return { ...state, posts: payload, loading: false };
    },

    [getPosts.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Get a single user's post by id
    [getPost.pending]: (state) => {
      return { loading: true };
    },

    [getPost.fulfilled]: (state, { payload }) => {
      return { ...state, post: payload, loading: false };
    },

    [getPost.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Add like
    [addLike.pending]: (state) => {
      return { loading: true };
    },

    [addLike.fulfilled]: (state, { payload }) => {
      //   console.log(current(state));
      return { ...state, posts: payload, loading: false };
    },

    [addLike.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Remove like
    [removeLike.pending]: (state) => {
      return { loading: true };
    },

    [removeLike.fulfilled]: (state, { payload }) => {
      return { ...state, posts: payload, loading: false };
    },

    [removeLike.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Delete a post
    [deletePost.pending]: (state) => {
      return { loading: true };
    },

    [deletePost.fulfilled]: (state, { payload }) => {
      console.log(payload);
      return { ...state, posts: payload, loading: false };
    },

    [deletePost.rejected]: (state, { payload }) => {
      console.log(payload);
      return { ...state, error: payload, loading: false };
    },

    // Add a post
    [addPost.pending]: (state) => {
      return { loading: true };
    },

    [addPost.fulfilled]: (state, { payload }) => {
      return { ...state, posts: payload, loading: false };
    },

    [addPost.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Add a comment
    [addComment.pending]: (state) => {
      return { loading: true };
    },

    [addComment.fulfilled]: (state, { payload }) => {
      console.log('Payload data from thunk:', payload);
      return { ...state, post: payload, loading: false };
    },

    [addComment.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },

    // Remove a comment
    [deleteComment.pending]: (state) => {
      return { loading: true };
    },

    [deleteComment.fulfilled]: (state, { payload }) => {
      return { ...state, post: payload, loading: false };
    },

    [deleteComment.rejected]: (state, { payload }) => {
      return { ...state, error: payload, loading: false };
    },
  },
});

export const selectPost = (state) => state.post;

export default postSlice.reducer;
