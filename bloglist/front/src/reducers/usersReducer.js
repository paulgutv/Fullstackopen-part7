import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    updateUsersAdd(state, action) {
      const newObj = {
        title: action.payload.title,
        author: action.payload.author,
        id: action.payload.id,
        url: action.payload.url
      }
      return state.map(a => a.name === action.payload.user.name ?
        a = {
          name: a.name,
          blogs: a.blogs.concat(newObj),
          id: a.id,
          username: a.username
        } :
        a
      )
    },
    updateUsersDelete(state, action) {
      return state.map(a => a.name === action.payload.user.name ?
        a = {
          name: a.name,
          blogs: a.blogs.filter(b => b.id !== action.payload.id),
          id: a.id,
          username: a.username
        } :
        a
      )
    }
  }
})

export const { setUsers, updateUsersAdd, updateUsersDelete } = usersSlice.actions

export const initializedUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer