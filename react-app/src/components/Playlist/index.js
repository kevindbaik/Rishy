import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPlaylists } from '../../store/user';
import './Playlist.css'

function PlaylistPage({ currUser }) {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.user.UserPlaylists);

  useEffect(() => {
    dispatch(fetchUserPlaylists(currUser.id))
  }, [dispatch, currUser]);

  if(!playlists) return null;
  console.log(currUser);
  console.log('wwooooo', playlists)
  return (
    <>
      <h3>Manage Your Playlists</h3>
      <div id='allplaylist-container'>
        {Object.values(playlists).map((playlist) => (
          <div>
            <img className='allplaylist-image' src={playlist.posts[0].photoUrl}></img>
            <p>{playlist.name}</p>
            {playlist.private ? <i class="fa-solid fa-lock"></i> : <i class="fa-solid fa-unlock"></i>}
            <p>{playlist.posts.length} posts</p>
            <p>{playlist.updatedAt}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default PlaylistPage
