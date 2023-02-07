import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await axios.post("/login", params);
    return data;
});

export const fetchReister = createAsyncThunk("auth/fetchReister", async (params) => {
    const { data } = await axios.post("/sign_up", params);
    return data;
});

export const fetchAuthUserInfo = createAsyncThunk("auth/fetchAuthUserInfo", async () => {
    const { data } = await axios.get("/userinfo");
    return data;
});


const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        }, 
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthUserInfo.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        }, 
        [fetchAuthUserInfo.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthUserInfo.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchReister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        }, 
        [fetchReister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchReister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;