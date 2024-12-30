import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name:"",
  email:"",
  uid:"",
  img:"",
  isAuth:false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin:(state,action)=>{
      state.name = action.payload.name
      state.email = action.payload.email
      state.uid = action.payload.uid
      state.img = action.payload.img
      state.isAuth = true
    },
    userLogout:(state)=>{
      state.name = "",
      state.email = ""
      state.uid = ""
      state.img = ""
      state.isAuth=false
    }
  }
});

export const {userLogin,userLogout} = userSlice.actions

export default userSlice.reducer