export const LOAD_USER = '/users/LOAD_USER';
export const LOAD_USER_POSTS = '/users/LOAD_USER_POSTS';
export const DELETE_USER_POST = 'posts/DELETE_USER_POST';
export const LOAD_USER_PLAYLISTS = '/users/LOAD_USER_PLAYLISTS';

export const loadUser = (user) => {
  return {
    type: LOAD_USER,
    user
  }
};

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

export const loadUserPlaylists = (playlists) => {
  return {
    type: LOAD_USER_PLAYLISTS,
    playlists
  }
};


export const fetchUser = (userId) => async(dispatch) => {
  const response = await fetch(`/api/users/${userId}`);

  if(response.ok) {
    const data = await response.json();
    dispatch(loadUser(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
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

export const fetchUserPlaylists = (userId) => async(dispatch) => {
  const response = await fetch(`/api/users/${userId}/playlists`);

  if(response.ok) {
    const data = await response.json();
    console.log('ddddd', data)
    dispatch(loadUserPlaylists(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  };
};

const initialState = { User: {}, UserPosts: {}, UserPlaylists: {}};
const userReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_USER:
      newState = { ...state, User : {...action.user}};
      return newState;
    case LOAD_USER_POSTS:
      newState = { ...state, UserPosts : {...action.posts}};
      return newState;
    case DELETE_USER_POST:
      newState = { ...state, UserPosts: {...state.UserPosts} };
      delete newState.UserPosts[action.postId];
      return newState;
    case LOAD_USER_PLAYLISTS:
      newState = { ...state, UserPlaylists : {...action.playlists}};
      return newState;
    default:
      return state;
  }
};

export default userReducer
