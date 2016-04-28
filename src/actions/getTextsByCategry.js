import fetch from 'isomorphic-fetch';

const baseUrl = '127.0.0.1:8360';

export const REQUEST_TEXTS = 'REQUEST_TEXTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_CATEGRY = 'SELECT_CATEGRY';
export const INVALIDATE_TEXTS = 'INVALIDATE_TEXTS';

export function selectCategry(category_id) {
  return {
    type: SELECT_CATEGRY,
    category_id
  }
}

export function invalidateTexts(category_id) {
  return {
    type: INVALIDATE_TEXTS,
    category_id
  }
}

function requestTexts(category_id) {
  return {
    type: REQUEST_TEXTS,
    category_id
  }
}

function receiveTexts(category_id, json) {
  return {
    type: RECEIVE_POSTS,
    category_id,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchTexts(category_id) {
  return dispatch => {
    dispatch(requestTexts(category_id))
    return fetch(`${baseUrl}/categories/${category_id}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTexts(category_id, json)))
  }
}

export function fetchPostsIfNeeded(category_id) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts(category_id))
  }
}
