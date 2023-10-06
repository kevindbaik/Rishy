export const LOAD_COMMENTS = '/comments/LOAD_COMMENTS';
export const CREATE_COMMENT = '/comments/CREATE_COMMENT';

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
  console.log(response)
  if(response.ok) {
    const data = await response.json();
    dispatch(createComment(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

const initialState = {}
const commentReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_COMMENTS:
      newState = { ...action.comments };
      return newState
    case CREATE_COMMENT:
      newState = { ...state, ...action.comment };
      return newState
    default:
      return state
  }
};

export default commentReducer;
