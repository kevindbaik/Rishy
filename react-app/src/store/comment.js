export const LOAD_COMMENTS = '/comments/LOAD_COMMENTS';

export const loadComments = comments => {
  return {
    type: LOAD_COMMENTS,
    comments
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

const initialState = {}
const commentReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_COMMENTS:
      console.log('state', state)
      newState = { ...action.comments };
      console.log('xz', newState)
      return newState
    default:
      return state
  }
};

export default commentReducer;
