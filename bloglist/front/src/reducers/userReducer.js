import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    exist: null,
    username: '',
    password: '',
  },
  reducers: {
    setUser(state, action) {
      state.exist = action.payload
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    },
  },
})

export const { setUser, setUsername, setPassword } = userSlice.actions
export default userSlice.reducer