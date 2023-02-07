import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchPostRemove = createAsyncThunk('posts/fetchPostRemove', async(id) => 
    axios.delete(`/posts/${id}`)
);


const initialState = {
    posts: {
        items: [],
        status: 'loading'
    }
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        }, 
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //////////////////////////////////
        [fetchPostRemove.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        }
    },
});


export const postsReducer = postSlice.reducer;