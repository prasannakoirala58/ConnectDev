import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectPost } from '../../reducers/postSlice';
import { getPost } from '../../reducers/postThunk';

const Post = () => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector(selectPost);
  const { id } = useParams();
  //   console.log('Post:', post);
  //   console.log('userID:', id);

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  return loading || post === undefined || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={`/posts`} className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm id={id} post={post} />
      <div>
        {/* {console.log(post)} */}
        {(post !== null || post !== undefined) &&
          post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              postId={post._id}
              comment={comment}
              post={post}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default Post;
