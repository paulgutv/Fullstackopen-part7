import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification, notificationType } from '../reducers/notificationReducer'
import { updateUsersAdd, updateUsersDelete } from './usersReducer'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogs(state, action) {
      const newArr = state.map(a => a.id === action.payload.id ? action.payload : a)
      return newArr.sort((a, b) => b.likes - a.likes)
    },
    deleteBlogs(state, action) {
      return state.filter(a => a.id === action.payload.id ? null : a)
    }
  }
})

export const { setBlogs, appendBlog, updateBlogs, deleteBlogs } = blogSlice.actions

export const initializedBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(updateUsersAdd(newBlog))
      dispatch(setNotification(`The new blog "${newBlog.title}" by "${newBlog.author}" added`))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    } catch (exception) {
      dispatch(setNotification('Invalid fields'))
      dispatch(notificationType('error'))
      setTimeout(() => {
        dispatch(setNotification(null))
        dispatch(notificationType(null))
      }, 5000)
    }    
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const content = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        id: blog.id,
        comments: blog.comments,
        user: {
          id: blog.user.id,
          name: blog.user.name,
          username: blog.user.username
        }
      }
    await blogService.update(id, content)
    dispatch(updateBlogs(content))
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const id = blog.id
    const content = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      comments: blog.comments.concat(comment),
      user: {
        id: blog.user.id,
        name: blog.user.name,
        username: blog.user.username
      }
    }
    await blogService.update(id, content)
    dispatch(updateBlogs(content))
  } 
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}?"`)) {
      await blogService.remove(blog.id)
      console.log(blog)
      dispatch(deleteBlogs(blog))
      dispatch(updateUsersDelete(blog))
    }
  }
}

export default blogSlice.reducer
