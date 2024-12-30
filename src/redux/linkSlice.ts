import { createSlice } from '@reduxjs/toolkit'
import { LinkType } from '../types/types';
const initialState = {
    links: [] as LinkType[]
}

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLinks:(state,action)=>{
        state.links = action.payload
    }
  }
});

export const {setLinks} = linkSlice.actions

export default linkSlice.reducer