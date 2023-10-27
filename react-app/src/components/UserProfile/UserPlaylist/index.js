import React, {useState} from "react";
import OpenModalDiv from "../../Playlist/OpenModalDiv";
import PlaylistModal from "../../Playlist/PlaylistModal";

function UserPlaylist({ userPlaylist, currUser, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleOpenPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlaylist(null);
  };

  if(userPlaylist.private) return null;

  return (
    <OpenModalDiv
    modalComponent={<PlaylistModal playlist={userPlaylist} currUser={currUser} user={user} handleClose={handleCloseModal}/>}
    >
      <div id='userplaylist-playlistcont'>
        <img className="userplaylist-playlistphoto" src={userPlaylist.posts[0].photoUrl}></img>
        <p className="userplaylist-pname">{userPlaylist.name}</p>
        <p className="userplaylist-rname">by {user.firstName} {user.lastName}</p>
        <p className="userplaylist-date">{userPlaylist.createdAt}</p>
        {/* <p className="userplaylist-pcount">{userPlaylist.posts.length} posts</p> */}
      </div>
    </OpenModalDiv>
  )
};

export default UserPlaylist;
