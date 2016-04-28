import fetch from 'isomorphic-fetch';

const baseUrl = '127.0.0.1:8360';

export const REQUEST_TEXTS = 'REQUEST_TEXTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_CATEGRY = 'SELECT_CATEGRY';
export const INVALIDATE_TEXTS = 'INVALIDATE_TEXTS';

export function selectCategry(categoryId) {
  return {
    type: SELECT_CATEGRY,
    categoryId
  }
}

export function invalidateTexts(categoryId) {
  return {
    type: INVALIDATE_TEXTS,
    categoryId
  }
}

function requestTexts(categoryId) {
  return {
    type: REQUEST_TEXTS,
    categoryId
  }
}

function receiveTexts(categoryId, json) {
  return {
    type: RECEIVE_POSTS,
    categoryId,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchTexts(categoryId) {
  return dispatch => {
    dispatch(requestTexts(categoryId))
    return fetch(`${baseUrl}/categories/${categoryId}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTexts(categoryId, json)))
  }
}

export function fetchPostsIfNeeded(categoryId) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts(categoryId))
  }
}
