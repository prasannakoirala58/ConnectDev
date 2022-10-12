import React, { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { setAlert } from '../../reducers/alertSlice';
import { addPost } from '../../reducers/postThunk';

const PostForm = ({ posts }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text, posts }));
          dispatch(setAlert(' Post Created', 'success'));
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
