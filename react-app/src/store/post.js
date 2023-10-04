export const LOAD_ALL_POSTS = 'posts/LOAD_ALL_POSTS';
export const LOAD_ONE_POST = 'posts/LOAD_ONE_POST';

export const loadAllPosts = (posts) => {
  return {
    type: LOAD_ALL_POSTS,
    posts
  }
};

export const loadOnePost = (post) => {
  return {
    type: LOAD_ONE_POST,
    post
  }
};

export const checkPostExists = postId => async(dispatch) => {
  const response = await fetch(`/api/posts/check/${postId}`);
  const data = await response.json();

  if(response.ok) {
    return data.exists
  } else {
    throw data
  }
}

export const fetchAllPosts = () => async(dispatch) => {
  const response = await fetch('/api/posts');
  if(response.ok) {
    const data = await response.json();
    dispatch(loadAllPosts(data));
    return data
  } else {
    const errors = await response.json();
    return errors
  }
};

export const fetchOnePost = postId => async(dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);
  if(response.ok) {
    const data = await response.json();
    console.log(data)
    dispatch(loadOnePost(data));
    return data
  } else {
    const errors = await response.json();
    return errors
  }
};

const initialState = { allPosts: {}, onePost: {}};
const postReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_ALL_POSTS:
      newState = { ...state, allPosts : {...action.posts }};
      return newState
    case LOAD_ONE_POST:
      newState = { ...state, onePost : { ...action.post }}
      return newState
    default:
      return state
  }
};

export default postReducer
