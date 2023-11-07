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

  if(userPlaylist.private || userPlaylist.posts.length === 0) return null;

  return (
    <OpenModalDiv
    modalComponent={<PlaylistModal playlist={userPlaylist} currUser={currUser} user={user} handleClose={handleCloseModal}/>}
    >
      <div id='userplaylist-playlistcont'>
        <img className="userplaylist-playlistphoto" src={userPlaylist.posts[0].photoUrl}></img>
        <div className="userplayplaylist-pname-cont">
          <p className="userplaylist-pname">{userPlaylist.name}</p>
        </div>
        <p className="userplaylist-rname">by {user.firstName} {user.lastName}</p>
        <p className="userplaylist-date">{userPlaylist.createdAt}</p>
      </div>
    </OpenModalDiv>
  )
};

export default UserPlaylist;
