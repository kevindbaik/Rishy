import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/post";
import { fetchUserPlaylists } from "../../store/user";
import Post from "../Post";
import "./Home.css";
import PlaylistModal from "../Playlist/PlaylistModal";
import { fetchCreateUserPlaylist } from "../../store/user";import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PlaylistForm from "../Playlist/PlaylistForm";
import Loading from "../Loader";


function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.allPosts);
  const currUser = useSelector(state => state.session.user);
  const playlists = useSelector(state => state.user.UserPlaylists);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleCreatePlaylistOpen = () => setCreatePlaylistModalOpen(true);
  const handleCreatePlaylistClose = () => setCreatePlaylistModalOpen(false);

  const handleCreatePlaylistSubmit = async (playlistData) => {
    try {
      await dispatch(fetchCreateUserPlaylist(playlistData, currUser.id));
      setErrors([])
    } catch(error) {
      setErrors(error)
    }
    finally {
      handleCreatePlaylistClose();
      dispatch(fetchUserPlaylists(currUser.id));
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        await dispatch(fetchAllPosts());
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (currUser) {
      dispatch(fetchUserPlaylists(currUser.id));
    }
  }, [dispatch, currUser]);


  const handleOpenPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlaylist(null);
  };

  if (loading) return <Loading />;

  if(!posts || Object.values(posts).length === 0) return null
  return (
    <div id="home-wrap">
      <div id="home-sidebar">
        <div className="sidebar-tile">
          <p>hello {currUser.firstName}.</p>
        </div>
        <div className="sidebar-tile sidebar-collections">
        <div>
        <div className="sidebar-tile">
        <p style={{ fontWeight: 'bold'}}>your playlists:</p>
        </div>
        </div>
          {Object.values(playlists).map(playlist => (
            <div key={playlist.id} className="sidebar-onecollection" onClick={(e) => handleOpenPlaylist(playlist)}>
              <p>{playlist.name}</p>
            </div>))}
            {errors && errors.name && <p style={{ color: 'red' }}>playlist name too long</p>}
            <button className="sidebar-create-collection" onClick={handleCreatePlaylistOpen}> + </button>
    </div>
    <Modal
        open={createPlaylistModalOpen}
        onClose={handleCreatePlaylistClose}
        aria-labelledby="create-playlist-modal"
        aria-describedby="create-playlist-form"
      >
        <Box sx={{  position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '220px',
          maxHeight: '100vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px',}}>
          <PlaylistForm onSubmit={handleCreatePlaylistSubmit} />
        </Box>
      </Modal>
      </div>
    <div id="home-post-container">
      {Object.values(posts).map((post) => (
        <Post post={post}/>
      ))}
    </div>
       {isModalOpen && selectedPlaylist && (
        <>
        <div className="modal-backdrop" onClick={handleCloseModal}></div>
        <PlaylistModal
          playlist={selectedPlaylist}
          currUser={currUser}
          user={currUser}
          handleClose={handleCloseModal}
        />
        </>
      )}
    </div>
  )
}

export default Home;
