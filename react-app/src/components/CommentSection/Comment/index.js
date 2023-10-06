import React, { useEffect, useState, useRef } from "react";
import '../Comment.css'

function Comment({ comment, user }) {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return(
  <div className="onecomment-container">
    {comment.userId === user.id &&
      <div className="onecomment-edit-container">
        <i onClick={toggleDropdown} class="fa-solid fa-ellipsis-vertical"></i>
        {dropdownOpen &&
          <div className="onecomment-dropdown-container" ref={dropdownRef}>
            <div className="dropdown-individual-container">
              <i class="fa-sharp fa-regular fa-pen-to-square"></i>
              <p>edit</p>
            </div>
            <div className="dropdown-individual-container">
              <i class="fa-regular fa-trash-can"></i>
              <p>delete</p>
            </div>
          </div>
          }
      </div>
    }
    <p>{comment.content}</p>
    <p>{comment.createdAt}</p>
    <span>@{comment?.User?.username}</span>
  </div>
 )};

export default Comment
