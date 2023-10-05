import React, {useState, useEffect } from "react";
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
  const [ title,setTitle ] = useState('');
  const [ artist, setArtist ] = useState('');
  const [ song, setSong ] = useState(null);
  const [ photo, setPhoto ] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('song', song);
    formData.append('photo', photo);

    const newPost = await dispatch(fetchCreatePost(formData));
    if(newPost) {
      dispatch(fetchOnePost(newPost.id));
      closeModal();
      history.push(`/posts/${newPost.id}`);
    };
  }
  return (
    <div className="postform-container">
      <h3>Create a Post</h3>
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
          required
        />
        <input
          type='file'
          onChange={e => setPhoto(e.target.files[0])}
          accept=".png, .jpg, .jpeg, .gif"
          required
        />
        <button type='submit'>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePostForm;
