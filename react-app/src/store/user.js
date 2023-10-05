export const LOAD_USER_POSTS = '/users/LOAD_USER_POSTS';
export const DELETE_USER_POST = 'posts/DELETE_USER_POST';

export const loadUserPosts = (posts) => {
  return {
    type: LOAD_USER_POSTS,
    posts
  }
};

export const deleteUserPost = postId => {
  return {
    type: DELETE_USER_POST,
    postId
  }
};

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
};

export const fetchDeleteUserPost = (postId) => async(dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(deleteUserPost(postId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

const initialState = {};
const userReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_USER_POSTS:
      newState = { ...state, ...action.posts }
      return newState
    case DELETE_USER_POST:
      newState = { ...state }
      delete newState[action.postId]
      return newState
    default:
      return state
  }
};

export default userReducer
