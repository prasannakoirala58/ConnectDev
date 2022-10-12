import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectPost } from '../../reducers/postSlice';
import { getPosts } from '../../reducers/postThunk';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(selectPost);
  //   console.log('Posts:', posts);
  //   console.log('Loading:', loading);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div>
      {loading || posts === undefined || posts === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community
          </p>
          <PostForm posts={posts} />
          {/* {console.log(posts)} */}
          <div className="posts">
            {(posts !== undefined || posts !== null) &&
              posts.map((post) => <PostItem key={post._id} post={post} posts={posts} />)}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Posts;
