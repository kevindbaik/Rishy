import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { fetchOnePost, checkPostExists } from "../../../store/post";
import './PostDetails.css';
import CommentSection from "../../CommentSection";
import { fetchCreateComment, fetchLoadComments } from "../../../store/comment";
import AddComment from "../../CommentSection/AddComment";

function PostDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.posts.onePost);
  const comments = useSelector(state => state.comments);
  const [hasPrevious, setHasPrevious] = useState(true);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    dispatch(fetchOnePost(postId));
    dispatch(fetchLoadComments(postId))
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(checkPostExists(Number(postId) - 1))
    .then(() => setHasPrevious(true))
    .catch(() => setHasPrevious(false));

    dispatch(checkPostExists(Number(postId) + 1))
    .then(() => setHasNext(true))
    .catch(() => setHasNext(false));
  }, [dispatch, postId]);

  const handleNavigate = (num) => {
    const newId = Number(postId) + num;
    history.push(`/posts/${newId}`);
  };

  const handleNextSong = () => {
    const nextId = Number(postId) + 1;
    dispatch(checkPostExists(nextId))
    .then(() => history.push(`/posts/${nextId}`))
    .catch(() => history.push(`/posts`));
  };

  const hasCommented = () => {
    let hasCommented = false;
    const userCommented = Object.values(comments).find(comment => comment.userId === user.id);
    if(userCommented) {
      hasCommented = true;
    };
    return hasCommented
  };

  const handleAddComment = async (comment) => {
    const newComment = await dispatch(fetchCreateComment(comment, postId))
    if(newComment) {
      dispatch(fetchLoadComments(postId))
    }
  };

  if(!post || !comments || !user) return null

  return(
    <div className="onepost-container">
      <div className='onepost-mediacontainer'>
        <img id='onepost-image' src={post?.photoUrl}></img>
        <h4 className="onespot-songinfo">{post.songArtist} - {post.songTitle}</h4>
        <AudioPlayer
        src={post?.songUrl}
        autoPlay={true}
        volume={0.5}
        showSkipControls={false}
        onEnded={handleNextSong}
        />
        {hasPrevious && <i class="fa-solid fa-chevron-left onespot-previous" onClick={() => handleNavigate(-1)}></i>}
        {hasNext && <i class="fa-solid fa-chevron-right onespot-next" onClick={() => handleNavigate(1)}></i>}
      </div>
      <div className="onepost-detailscontainer">
        <p>{post.creator?.username}</p>
        <p>{post.caption}</p>
      </div>
      <div className="addcomment-container">
      {!hasCommented() && post.userId !== user.id && <AddComment onSubmit={handleAddComment}/>}
      </div>
      <CommentSection comments={comments} user={user} post={post}/>
    </div>
  )
}

export default PostDetails
