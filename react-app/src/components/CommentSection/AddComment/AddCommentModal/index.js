import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Box, IconButton } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { fetchCreateComment, fetchLoadComments } from '../../../../store/comment';
import { fetchUserPosts } from '../../../../store/user';


function AddToCommentModal({ postId, user, pageUser }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [ errors, setErrors ] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (comment) => {
    const newComment = await dispatch(fetchCreateComment(comment, postId));
    if(newComment.errors) {
      setErrors(newComment.errors);
    };
    if(newComment && !newComment.errors) {
      setErrors([]);
      dispatch(fetchLoadComments(postId));
      dispatch(fetchUserPosts(pageUser.id));
      handleClose();
    };
  };

  return (
    <div id='userprofile-addcomment-container'>
      <IconButton onClick={handleOpen}>
        <AddCommentIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{  display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '250px',
        margin: 'auto',
        marginTop: '20%',
        backgroundColor: 'white', // or any color of your choice
        borderRadius: '10px',
        boxShadow: 24, }}>
          <p style={{ marginTop: '0', marginBottom: '2vh'}}>add comment</p>
          {errors.content && <p className="newcomment-errors-text profile-errors">{errors.content}</p>}
          <textarea id='userprofile-addcomment-text' value={comment} onChange={(e) => setComment(e.target.value)} />
          <button id='submit-comment-button' onClick={() => handleSubmit(comment)}>Submit</button>
        </Box>
      </Modal>
    </div>
  );
}

export default AddToCommentModal;
