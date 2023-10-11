import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { fetchCreatePost, fetchOnePost } from "../../../../store/post";
import { useModal } from "../../../../context/Modal";
import '../PostForm.css';

function CreatePostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [ caption, setCaption ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ artist, setArtist ] = useState('');
  const [ song, setSong ] = useState(null);
  const [ photo, setPhoto ] = useState(null);
  const [ previewPhoto, setPreviewPhoto ] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('song', song);
    formData.append('photo', photo);

    const newPost = await dispatch(fetchCreatePost(formData));
    if(newPost.errors) {
      setErrors(newPost.errors);
      setLoading(false);
    };

    if(newPost && !newPost.errors) {
      dispatch(fetchOnePost(newPost.id));
      closeModal();
      history.push(`/posts/${newPost.id}`);
      setLoading(false);
    };
  };

  const fileWrap = (e) => {
    e.stopPropagation();
    const tempFile = e.target.files[0];
    setPhoto(tempFile);
    const newImageURL = URL.createObjectURL(tempFile);
    setPreviewPhoto(newImageURL);
  };

  return (
    <div id="postform-container">
      <h3>upload post</h3>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <div id='postform-photo-container'>
          <label htmlFor="photoUpload" className="uploadphoto-pseudobutton">
            upload photo:
          </label>
          <img id='showPhotoUpload' src={previewPhoto}></img>
          <input
          id='photoUpload'
          type='file'
          onChange={fileWrap}
          accept=".png, .jpg, .jpeg, .gif"
          required
          />
        </div>
        <div id='postform-caption-container'>
          <label className="postform-label">
            caption:
          </label>
          {errors && errors.caption &&
          <p id='error-text'>{errors.caption}</p>
          }
          <input
            type='text'
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="tell us about your post"
          />
        </div>
        <div id='postform-songtitle-container'>
          <label className="postform-label">
            song title:
          </label>
          {errors && errors.title &&
          <p id='error-text'>{errors.title}</p>
          }
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="title"
          />
        </div>
        <div id='postform-songartist-container'>
          <label className="postform-label">
            song artist:
          </label>
          {errors && errors.artist &&
          <p id='error-text'>{errors.artist}</p>
          }
          <input
            type='text'
            value={artist}
            onChange={e => setArtist(e.target.value)}
            placeholder="artist"
          />
        </div>
        <div id='postform-mp3-container'>
          <label htmlFor="songUpload" className="uploadsong-pseudobutton">
            upload song:
          </label>
          <input
            id='songUpload'
            type='file'
            onChange={e => {
              setSong(e.target.files[0]);
              document.getElementById('showSongUpload').innerText = e.target.files[0]?.name || ''}}
            accept=".mp3"
            required
          />
          <span id="showSongUpload"></span>
        </div>
        {loading ? <div className="loading-text">
        creating....</div> : <button id="postform-submit-button" type='submit'>Create Post</button>}
      </form>
    </div>
  )
}

export default CreatePostForm;
