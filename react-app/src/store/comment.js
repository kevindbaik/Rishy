export const LOAD_COMMENTS = '/comments/LOAD_COMMENTS';
export const CREATE_COMMENT = '/comments/CREATE_COMMENT';
export const UPDATE_COMMENT = '/comments/UPDATE_COMMENT';
export const DELETE_COMMENT = '/comments/DELETE_COMMENT';

export const loadComments = comments => {
  return {
    type: LOAD_COMMENTS,
    comments
  }
};

export const createComment = comment => {
  return {
    type: CREATE_COMMENT,
    comment
  }
};

export const updateComment = comment => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
};

export const deleteComment = commentId => {
  return {
    type: DELETE_COMMENT,
    commentId
  }
};

export const fetchLoadComments = (postId) => async(dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`);

  if(response.ok) {
    const data = await response.json();
    dispatch(loadComments(data));
    return data
  } else {
    const errors = response.json();
    return errors
  }
};

export const fetchCreateComment = (comment, postId) => async(dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({comment, postId})
  });

  if(response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const fetchUpdateComment = (comment, commentId) => async(dispatch) => {
  console.log('xxx', commentId)
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({comment})
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(updateComment(data))
    return data;
  } else {
    const errors = await response.json();
    return errors;
  };
};

export const fetchDeleteComment = (commentId) => async(dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, { method: "DELETE"});

  if(response.ok) {
    const message = await response.json();
    dispatch(deleteComment(commentId));
    return message;
  } else {
    const errors = response.json();
    return errors;
  }
}

const initialState = {}
const commentReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_COMMENTS:
      newState = { ...action.comments };
      return newState
    case CREATE_COMMENT:
    case UPDATE_COMMENT:
      console.log('sss', state)
      newState = { ...state };
      console.log('s22', newState)
      newState[action.comment.id] = action.comment;
      console.log('ns', newState)
      return newState
    case DELETE_COMMENT:
      newState = { ...state }
      delete newState[action.commentId]
      return newState
    default:
      return state
  }
};

export default commentReducer;
