import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../../reducers/authSlice';
import { setAlert } from '../../reducers/alertSlice';
import { deleteComment } from '../../reducers/postThunk';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  post,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user.user._id && (
          <button
            onClick={(e) => {
              dispatch(deleteComment({ postId, commentId: _id, post }));
              dispatch(setAlert(' Comment Removed', 'success'));
            }}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
