import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import linkSlice from "./linkSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        link:linkSlice,
    }
}) 


export default store