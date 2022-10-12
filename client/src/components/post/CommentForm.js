import React, { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { addComment } from '../../reducers/postThunk';
import { setAlert } from '../../reducers/alertSlice';

const CommentForm = ({ id, post }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment({ text, postId: id, post }));
          dispatch(setAlert(' Comment Added', 'success'));
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Leave a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
