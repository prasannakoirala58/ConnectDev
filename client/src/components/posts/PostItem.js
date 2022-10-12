import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../../reducers/authSlice';
import { setAlert } from '../../reducers/alertSlice';
import { addLike, removeLike, getPosts, deletePost } from '../../reducers/postThunk';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  posts,
  showActions,
}) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const invokeAddLike = async () => {
    try {
      await dispatch(addLike({ postId: _id, posts })).unwrap();
      await dispatch(setAlert(' You liked a post', 'success'));
    } catch (err) {
      await dispatch(getPosts());
    }
  };

  const invokeRemoveLike = async () => {
    try {
      await dispatch(removeLike({ postId: _id, posts })).unwrap();
      await dispatch(setAlert(' You unliked a post', 'success'));
    } catch (err) {
      await dispatch(getPosts());
    }
  };

  const invokeDeletePost = async () => {
    try {
      await dispatch(deletePost({ postId: _id, posts })).unwrap();
      await dispatch(setAlert(' Post Removed', 'success'));
    } catch (error) {
      await dispatch(getPosts());
    }
  };

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

        {showActions && (
          <Fragment>
            <button
              onClick={() => invokeAddLike()}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={() => invokeRemoveLike()}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user.user._id && (
              <button
                onClick={() => invokeDeletePost()}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;
