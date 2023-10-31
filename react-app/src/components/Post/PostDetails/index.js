import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { fetchOnePost, checkPreviousPostExists, checkNextPostExists } from "../../../store/post";
import './PostDetails.css';
import CommentSection from "../../CommentSection";
import { fetchCreateComment, fetchLoadComments } from "../../../store/comment";
import AddComment from "../../CommentSection/AddComment";
import { fetchUserPlaylists } from "../../../store/user";
import PostPlaylistDropdown from "../PostsPlaylistDropdown";

function PostDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const user = useSelector(state => state.session.user);
  const post = useSelector(state => state.posts.onePost);
  const comments = useSelector(state => state.comments);
  const playlists = useSelector(state => state.user.UserPlaylists);
  const [ hasPrevious, setHasPrevious ] = useState(true);
  const [ hasNext, setHasNext ] = useState(true);
  const [ nextId, setNextId ] = useState(null);
  const [ prevId, setPrevId ] = useState(null);
  const [ errors, setErrors ] = useState([]);

  useEffect(() => {
    dispatch(fetchOnePost(postId));
    dispatch(fetchLoadComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(fetchUserPlaylists(user.id))
  }, [dispatch, user.id])

  useEffect(() => {
    const fetchSongs = async () => {
        try {
            const prevSong = await dispatch(checkPreviousPostExists(Number(postId)));
            setPrevId(prevSong);
            setHasPrevious(true);
        } catch (error) {
            setHasPrevious(false);
        }

        try {
            const nextSong = await dispatch(checkNextPostExists(Number(postId)));
            setNextId(nextSong);
            setHasNext(true);
        } catch (error) {
            setHasNext(false);
        }
    };
    fetchSongs();
}, [dispatch, postId]);

  const handlePreviousNavigate = (prevId) => {
    history.push(`/posts/${prevId}`);
  };

  const handleNextNavigate = (nextId) => {
    history.push(`/posts/${nextId}`);
  }

  const handleHomeNavigate = () => {
    history.push(`/posts`);
  }

  const hasCommented = () => {
    let hasCommented = false;
    const userCommented = Object.values(comments).find(comment => comment.userId === user.id);
    if(userCommented) {
        hasCommented = true;
    }
    return hasCommented
  };

  const handleAddComment = async (comment) => {
    const newComment = await dispatch(fetchCreateComment(comment, postId));
    if(newComment.errors) {
      setErrors(newComment.errors);
    };
    if(newComment && !newComment.errors) {
      setErrors([]);
      dispatch(fetchLoadComments(postId));
    };
  };

  const handleFollow = (e) => {
    e.preventDefault();
    alert('Follow feature coming soon')
  };

  const handleProfileClick = (e, post) => {
    e.preventDefault();
    history.push(`/users/${post.userId}/posts`)
  };

  if(!post || !comments) return null;

  return(
    <div className="onepost-container">
      <div className='onepost-mediacontainer'>
        <img id='onepost-image' src={post?.photoUrl}></img>
        <h4 className="onespot-songinfo">{post.songArtist} - {post.songTitle}</h4>
        <AudioPlayer
        id='onepost-audioplayer'
        src={post?.songUrl}
        autoPlay={true}
        volume={0.5}
        showSkipControls={false}
        onEnded={hasNext ? () => handleNextNavigate(nextId) : handleHomeNavigate}
        />
        {hasPrevious && <i class="fa-solid fa-chevron-left onespot-previous" onClick={() => handlePreviousNavigate(prevId)}></i>}
        {hasNext && <i class="fa-solid fa-chevron-right onespot-next" onClick={() => handleNextNavigate(nextId)}></i>}
      </div>
      <div id="onepost-detailscontainer">
        <img className="defaultuser-image onepost-creatorimage" onClick={(e) => handleProfileClick(e, post)} src="https://i.ibb.co/nRLSXSX/Default-pfp-svg.png" alt=""></img>
        <div id='onepost-creatorinfo'>
          <div id='creator-follow-container'>
          <p id='onepost-creator' onClick={(e) => handleProfileClick(e, post)}>{post.User?.username}</p>
          {user && user.id !== post.userId &&
            <button id='follow-button' onClick={handleFollow}>follow</button>
          }
          </div>
          <div id='onepost-caption-container'>
            <p id='onepost-caption'>{post.caption}</p>
          </div>
          <div id='onepost-poststats-container'>
            <i className="fa-sharp fa-regular fa-eye poststats-icons">
              {/* <p>{Math.floor(Math.random() * 500) + 1000}</p> */}
            </i>
            <i className="fa-regular fa-heart poststats-icons">
              {/* <p>{Math.floor(Math.random() * 500) + 100}</p> */}
            </i>
            <i className={user && hasCommented() ? "fa-solid fa-comment poststats-icons" : "fa-sharp fa-regular fa-comment poststats-icons"}>
              <p className="poststats-commentcount">{Object.values(comments).length}</p>
            </i>
            {post &&
            <div className="onepost-playlisticon">
            <PostPlaylistDropdown post={post} user={user} playlists={playlists}/>
            </div>}
            </div>
          <div id='onepost-postdate-container'>
            <p className="onepost-postdate">Updated on {post.createdAt}</p>
          </div>
        </div>
      </div>
      <h4 id='onepost-comment-header'>Comments</h4>
      {errors.content && <p className="newcomment-errors-text">{errors.content}</p>}
      <div className="addcomment-container">
        {user && !hasCommented() && post.userId !== user.id && <img className="defaultuser-image-comment" src="https://i.ibb.co/nRLSXSX/Default-pfp-svg.png" alt=""></img>}
        {user && !hasCommented() && post.userId !== user.id && <AddComment onSubmit={handleAddComment}/>}
      </div>
      <CommentSection comments={comments} user={user} isProfile={false}/>
    </div>
  )
}

export default PostDetails
