import React, {useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUpdatePost, fetchOnePost } from "../../../../store/post";
import { useModal } from "../../../../context/Modal";
import '../PostForm.css';

function UpdatePostForm({ post }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [ caption, setCaption ] = useState(post.caption);
  const [ title, setTitle ] = useState(post.songTitle);
  const [ artist, setArtist ] = useState(post.songArtist);
  const [ song, setSong ] = useState(null);
  const [ photo, setPhoto ] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('title', title);
    formData.append('artist', artist);
    if(song) {
      formData.append('song', song);
    };
    if(photo) {
      formData.append('photo', photo);
    };

    const updatedPost = await dispatch(fetchUpdatePost(formData, post.id));
    if(updatedPost) {
      dispatch(fetchOnePost(updatedPost.id));
      closeModal();
      history.push(`/posts/${updatedPost.id}`);
    }
  };

  return (
    <div className="postform-container">
      <h3>Update your post</h3>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input
          type='text'
          value={caption}
          onChange={e => setCaption(e.target.value)}
          placeholder="caption"
        />
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="title"
        />
        <input
          type='text'
          value={artist}
          onChange={e => setArtist(e.target.value)}
          placeholder="artist"
        />
        <input
          type='file'
          onChange={e => setSong(e.target.files[0])}
          accept=".mp3"
        />
        <input
          type='file'
          onChange={e => setPhoto(e.target.files[0])}
          accept=".png, .jpg, .jpeg, .gif"
        />
        <button type='submit'>Update</button>
      </form>
    </div>
  )
};

export default UpdatePostForm;
