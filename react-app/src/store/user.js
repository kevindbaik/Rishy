export const LOAD_USER_POSTS = '/users/LOAD_USER_POSTS'

export const loadUserPosts = (posts) => {
  return {
    type: LOAD_USER_POSTS,
    posts
  }
}

export const fetchUserPosts = (userId) => async(dispatch) => {
  const response = await fetch(`/api/users/${userId}/posts`);
  if(response.ok) {
    const data = await response.json();
    dispatch(loadUserPosts(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
}

const initialState = {};
const userReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_USER_POSTS:
      newState = { ...state, ...action.posts }
      return newState
    default:
      return state
  }
};

export default userReducer
