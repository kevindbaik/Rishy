import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../Comment.css'
import AddComment from "../AddComment";
import { fetchUpdateComment } from "../../../store/comment";
import OpenModalDiv from '../OpenModalDiv'
import CommentDelete from "../CommentDelete";

function Comment({ comment, user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  const [ errors, setErrors ] = useState([]);
  const dropdownRef = useRef(null);
  const commentId = comment.id;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditComment = async (comment) => {
    const updatedComment = await dispatch(fetchUpdateComment(comment, commentId));
    if(updatedComment.errors) {
      setErrors(updatedComment.errors);
      toggleEditMode();
    };

    if(updatedComment && !updatedComment.errors) {
      setErrors([]);
      toggleEditMode();
      toggleDropdown();
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const toggleEditMode = () => {
    setEditMode(prevState => !prevState);
  };

  const calculateDaysAgo = (commentDate) => {
    const date = new Date(commentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDifference = today - date;
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  };

  const handleProfileClick = (e, comment) => {
    e.preventDefault();
    history.push(`/users/${comment.userId}/posts`)
  };

  return(
  <div className="onecomment-container">
    {editMode ?
      <AddComment onSubmit={handleEditComment} initialValue={comment.content}/>
    :
    <>
      {user && comment.userId === user.id &&
        <div className="onecomment-manage-container">
          <i onClick={toggleDropdown} class="fa-solid fa-ellipsis-vertical"></i>
          {dropdownOpen &&
            <div className="onecomment-dropdown-container" ref={dropdownRef}>
              <div className="dropdown-individual-container onecomment-edit-container" onClick={toggleEditMode}>
                <i class="fa-sharp fa-regular fa-pen-to-square"></i>
                <p>edit</p>
              </div>
              <div className="dropdown-individual-container onecomment-delete-container">
              <OpenModalDiv modalComponent={<CommentDelete comment={comment}/>}/>
              </div>
            </div>
            }
        </div>
      }
      <div id='onecomment-info-container'>
        <img className="defaultuser-image-comment" src="https://i.ibb.co/nRLSXSX/Default-pfp-svg.png" alt="" onClick={(e) => handleProfileClick(e, comment)}></img>
        <div id='onecomment-userinfo'>
          <div id='comment-user-date'>
            <p id='comment-username' onClick={(e) => handleProfileClick(e, comment)}>@{comment?.User?.username}</p>
            <p id='comment-date'>{calculateDaysAgo(comment.createdAt)}d</p>
            {errors && errors.content && <p className="updatedcomment-errors-text">{errors.content}</p>}
          </div>
          <p id='comment-content'>{comment.content}</p>
        </div>
      </div>
    </>
    }
  </div>
 )};

export default Comment
