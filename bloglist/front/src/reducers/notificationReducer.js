import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload
    },
    notificationType(state, action) {
      state.type = action.payload
    }
  }
})

export const { setNotification, notificationType } = notificationSlice.actions
export default notificationSlice.reducer