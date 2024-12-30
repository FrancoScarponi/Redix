import userSlice from '../redux/userSlice'
import linkSlice from "../redux/linkSlice"
export type userType = {
    user: ReturnType<typeof userSlice>
}

export type linkReduxType = {
    link: ReturnType<typeof linkSlice>
}

export interface LinkType{
    url:string,
    shortUrl:string
    userUid:string
  }