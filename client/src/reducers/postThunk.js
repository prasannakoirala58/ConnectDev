import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertSlice';

// Get all post by all users from db
export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (any, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get('/api/posts');
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Get a single user's post by id
export const getPost = createAsyncThunk(
  'post/getPost',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      return res.data;
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));

      return rejectWithValue({
        msg: err.response.data.msg,
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Add like
export const addLike = createAsyncThunk(
  'post/addLike',
  async (postData, { getState, rejectWithValue, dispatch }) => {
    // console.log(postId);
    // console.log(post);
    const { postId, posts } = postData;
    console.log('Post id: ', postId, 'Posts Array:', posts);
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      console.log('Axios result data:', res.data, 'and', postId);
      console.log('Posts array passed from PostItem: ', posts);

      const postArr = posts.map((post) =>
        post._id === postId ? { ...post, likes: res.data } : post
      );

      console.log('Post array after mapping: ', postArr);

      return postArr;
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));

      return rejectWithValue({
        msg: err.response.data.msg,
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Remove like
export const removeLike = createAsyncThunk(
  'post/removeLike',
  async (postData, { rejectWithValue, dispatch }) => {
    const { postId, posts } = postData;
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      const postArr = posts.map((post) =>
        post._id === postId ? { ...post, likes: res.data } : post
      );
      return postArr;
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));

      return rejectWithValue({
        msg: err.response.data.msg,
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postData, { rejectWithValue, dispatch }) => {
    const { postId, posts } = postData;
    try {
      await axios.delete(`/api/posts/${postId}`);
      const postArr = posts.filter((post) => post._id !== postId);
      return postArr;
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));

      return rejectWithValue({
        msg: err.response.data.msg,
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Add a post
export const addPost = createAsyncThunk(
  'post/addPost',
  async (postData, { rejectWithValue, dispatch }) => {
    const { posts } = postData;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/posts', postData, config);
      return [res.data, ...posts];
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));

      return rejectWithValue({
        msg: err.response.data.msg,
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Add a comment
export const addComment = createAsyncThunk(
  'post/addComment',
  async (postData, { rejectWithValue, dispatch }) => {
    const { postId, post } = postData;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`/api/posts/comment/${postId}`, postData, config);
      //   const postArr = posts.map((post) =>
      //     post._id === postId ? { ...post, comments: res.data } : post
      //   );
      //   const comments = res.data;
      console.log('Post data from addComment: ', post);
      console.log('Comment data from addComment: ', res.data);
      return { ...post, comments: res.data };
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));

      return rejectWithValue({
        msg: err.response.data.msg,
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

// Remove/Delete a comment
export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async (postData, { rejectWithValue, dispatch }) => {
    const { postId, commentId, post } = postData;
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      //   const postArr = posts.filter((post) =>
      //     post._id === commentId ? { ...post, comments: res.data } : post
      //   );
      //   const postArr = posts.filter((post) => post._id !== commentId);
      //   const postArr = post.comments.filter((comment) =>
      //     post._id === postId ? { ...post, comments: res.data } : post
      //   );
      const commentArr = post.comments.filter((comment) => comment._id !== commentId);
      return { ...post, comments: commentArr };
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, 'danger'));

      return rejectWithValue({
        msg: err.response.data.msg,
        statusText: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);
