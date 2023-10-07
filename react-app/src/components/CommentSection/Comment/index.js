import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import '../Comment.css'
import AddComment from "../AddComment";
import { fetchLoadComments, fetchUpdateComment } from "../../../store/comment";
import OpenModalDiv from "../../../OpenModalDiv";
import CommentDelete from "../CommentDelete";

function Comment({ comment, user, post }) {
  const dispatch = useDispatch();
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);
  const dropdownRef = useRef(null);
  const commentId = comment.id;
  const postId = post.id;

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
    if(updatedComment) {
      dispatch(fetchLoadComments(postId));
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const toggleEditMode = () => {
    setEditMode(true);
  };

  return(
  <div className="onecomment-container">
    {editMode ?
      <AddComment onSubmit={handleEditComment} initialValue={comment.content}/>
    :
    <>
      {comment.userId === user.id &&
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
      <p>{comment.content}</p>
      <p>{comment.createdAt}</p>
      <span>@{comment?.User?.username}</span>
    </>
    }
  </div>
 )};

export default Comment
