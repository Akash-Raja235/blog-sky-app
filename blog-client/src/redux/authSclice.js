

import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { register } from "./api";


// get user from local storage
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user:user? user :null,
    isError:false,
    isSuccess:false,
    isLodding:false,
    message:""
}


// register user 

export const Asyncregister = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
        return register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
);

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        reset:(state)=>{
         state.isLodding=false
         state.isError = false
         state.isSuccess = false
         state.message = "false;"
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLodding= true
        })
        .addCase(register.fulfilled, (state,action)=>{
            state.isLodding = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state,action)=>{
            state.isLodding = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }

    
})


export const  {reset} = authSlice.actions
export default authSlice.reducer