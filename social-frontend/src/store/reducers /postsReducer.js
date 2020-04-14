import {FETCH_POST_SUCCESS, FETCH_TAGS_SUCCESS} from "../actions/postsAction";

const initialState = {
    posts: [],
    tags: [],
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST_SUCCESS:
            return {...state, posts: action.post};
        case FETCH_TAGS_SUCCESS:
            return {...state, tags: action.tags};
        default:
            return state
    }
};

export default postsReducer;