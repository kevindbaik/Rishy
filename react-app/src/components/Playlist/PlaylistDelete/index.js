import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from "../../../context/Modal";
import { fetchDeleteUserPlaylist } from '../../../store/user';

function PlaylistDelete({ playlist, currUser }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeletion = async(e) => {
    e.preventDefault();
    await dispatch(fetchDeleteUserPlaylist(playlist.id, currUser.id));
    closeModal();
  };

  const handleCancel = e => {
    e.preventDefault();
    closeModal();
  };

  console.log(playlist.id)
  return (
    <div id='commentdelete-container'>
      <h4>Confirm Deletion</h4>
      <button id="confirm-delete-button" onClick={handleDeletion}>Confirm</button>
      <button id='cancel-delete-button' onClick={handleCancel}>Cancel</button>
    </div>
  )
};

export default PlaylistDelete
