import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';

export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});
export const fetchPostRequest = () => ({type: FETCH_POSTS_REQUEST});
export const fetchPostFailure = error => ({type: FETCH_POSTS_FAILURE, error});

export const fetchTagsSuccess = tags => ({type: FETCH_TAGS_SUCCESS, tags});

export const getPosts = () => {
    return async dispatch => {
        try {
            dispatch(fetchPostRequest());
            const response = await axiosApi.get('/posts');
            dispatch(fetchPostSuccess(response.data))
        }catch (error) {
            dispatch(fetchPostFailure(error))
        }
    }
};

export const newPost = postData => {
    return async dispatch => {
        try {
            dispatch(fetchPostRequest());
            await axiosApi.post('/posts', postData);
            dispatch(push('/'))
        }catch (error) {
            dispatch(fetchPostFailure(error))
        }
    }
};

export const getTags = () => {
    return async dispatch => {
        const response = await axiosApi.get('/posts/tags');

        dispatch(fetchTagsSuccess(response.data))
    }
};