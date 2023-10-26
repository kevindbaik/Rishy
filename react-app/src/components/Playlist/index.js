import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPlaylists, fetchCreateUserPlaylist } from '../../store/user';
import PlaylistModal from './PlaylistModal';
import OpenModalDiv from './OpenModalDiv';
import OpenModalButton from '../OpenModalButton';
import { useModal } from '../../context/Modal';
import PlaylistForm from './PlaylistForm';
import PlaylistDelete from './PlaylistDelete';
import './Playlist.css'

function PlaylistPage({ currUser }) {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.user.UserPlaylists);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchUserPlaylists(currUser.id))
  }, [dispatch, currUser]);

  if(!playlists) return null;

  const onSubmit = async (data) => {
    await dispatch(fetchCreateUserPlaylist(data, currUser.id));
    closeModal();
  };

  return (
    <>
      <div>
      <h3>Manage Your Playlists ({Object.values(playlists).length})</h3>
      <OpenModalButton
      buttonText="Create Playlist"
      modalComponent={<PlaylistForm onSubmit={onSubmit}/>}
      />
      </div>
      <div id='allplaylist-container'>
        {Object.values(playlists).map((playlist) => (
          <>
            <OpenModalDiv
            modalComponent={<PlaylistModal playlist={playlist} currUser={currUser}/>}
            >
              <div key={playlist.id}>
                <img className='allplaylist-image' src={playlist.posts[0]?.photoUrl}></img>
                <p>{playlist.name}</p>
                {playlist.private ? <i class="fa-solid fa-lock"></i> : <i class="fa-solid fa-unlock"></i>}
                <p>{playlist.posts.length} posts</p>
                <p>{playlist.updatedAt}</p>
              </div>
            </OpenModalDiv>
            <OpenModalButton buttonText="Delete"
            modalComponent={<PlaylistDelete playlist={playlist} currUser={currUser}/>}/>
          </>
        ))}
      </div>
    </>
  );
}

export default PlaylistPage
