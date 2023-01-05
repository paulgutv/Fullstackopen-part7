import { useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification, notificationType } from './reducers/notificationReducer'
import { setBlogs, createBlog, updateBlog, addComment } from './reducers/blogReducer'
import { setUser, setPassword, setUsername } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'

import {
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom'

const BlogId = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/blogs/:id')
  const blogById = match
    ? blogs.find(a => a.id === match.params.id)
    : null

  
  
  const handleLike = async () => {
    dispatch(updateBlog(blogById))
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blogById, event.target.comment.value))
    event.target.comment.value = ''
  }

  if(!blogById) {
    return null
  }

  return (
    <div className='container__style'>
      <div className='subcontainer__style'>
        <h2 className='subtitle__style'>{blogById.title}</h2>
        <p>Url: <a href={blogById.url}>{blogById.url}</a></p>
        <p>Likes: {blogById.likes}
          <button onClick={handleLike} className='like__button'>🤍</button>
        </p>
        <p>Added by {blogById.user.name}</p>
        <h3>Comments:</h3>
        <form onSubmit={handleComment} className='form__style'>
          <div className='input__containerStyle'>
            <label className='label__style'>add comment</label>
            <input
              name='comment'
              className='input__mediumStyle'
              placeholder='write your comment here...'
            />
          </div>          
          <button type='submit' className='button__style'>add comment</button>
        </form>
        <ul className='pl-4 list-disc'>
          {blogById.comments.map(a => 
            <li key={a}>{a}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

const UserId = () => {
  const users = useSelector((state) => state.users)
  const match = useMatch('/users/:id')
  const userById = match
    ? users.find(a => a.id === match.params.id)
    : null
  
  if(!userById) {
    return null
  }

  return (
    <div className='container__style'>
      <div className='subcontainer__style'>
        <h2 className='subtitle__style'>User</h2>
        <h2>Name: {userById.name}</h2>
        <h3 className='subtitle__style'>Added blogs</h3>
        <ul className='pl-4 list-disc'>
          {userById.blogs.map(a =>
            <li key={a.title}><Link className='hover:underline' to={`/blogs/${a.id}`}>{a.title}</Link></li>
          )}
        </ul>
      </div>      
    </div>
  )
}

const BlogsView = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
        />
      ))}
    </div>
  )
}


const UsersView = () => {
  const users = useSelector((state) => state.users)

  return (
    <div className='container__style'>
      <div className='subcontainer__style'>
        <h2 className='subtitle__style'>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>          
            {users.map(a =>
              <tr key={users.indexOf(a)}>
                <td><Link to={`/users/${a.id}`}>{a.name}:</Link></td>
                <td className='px-10'>{a.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>      
    </div>
  )
}

const NavBar = () => {  
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const matchUsers = useMatch('/users/*')
  const matchHome = useMatch('/')
  const matchBlogs = useMatch('/blogs/*')

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
  

  if (matchUsers) {
    return (
      <div className='nav__container'>
        <div className='nav__subcontainer'>
          <div className='nav__flexContainer'>
            <div className='nav__optionsContainer'>
              <span><Link className='nav__optionButton' to='/'>blogs</Link> </span>
              <span><Link className='nav__activeButton' to='/users'>users</Link> </span>
            </div>
            <span className='text-white'>{user.exist.name} logged-in</span>
            <button onClick={handleLogout}><Link className='nav__logout' to='/'>logout</Link></button>
          </div>
        </div>
      </div>
    )
  }

  if (matchHome || matchBlogs) {
    return(
      <div className='nav__container'>
        <div className='nav__subcontainer'>
          <div className='nav__flexContainer'>
            <div className='nav__optionsContainer'>
              <span><Link className='nav__activeButton' to='/'>blogs</Link> </span>
              <span><Link className='nav__optionButton' to='/users'>users</Link> </span>
            </div>
            <span className='text-white'>{user.exist.name} logged-in</span>
            <button onClick={handleLogout}><Link className='nav__logout' to='/'>logout</Link></button>
          </div>
        </div>
      </div>
    )
  }
}

const App = () => {
  const username = useSelector((state) => state.user.username)
  const password = useSelector((state) => state.user.password)
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll()
      .then((blogs) => dispatch(setBlogs(blogs)))
    userService.getAll()
      .then((users) => dispatch(setUsers(users)))
    
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(newUser))
      blogService.setToken(newUser.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      dispatch(setUser(newUser))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password'))
      dispatch(notificationType('error'))
      setTimeout(() => {
        dispatch(setNotification(null)),
        dispatch(notificationType(null))
      }, 5000)
    }
  }

  return (
    <div className="h-full bg-gray-50">
      <Notification message={notification.message} type={notification.type} />
      {user.exist === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleUsername={({ target }) => dispatch(setUsername(target.value))}
            handlePassword={({ target }) => dispatch(setPassword(target.value))}
            handleLogin={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <NavBar />
          <h2 className='title__style'>blog app</h2>
          <Routes>
            <Route path='/' element={<BlogsView/>} />
            <Route path='/users/:id' element={<UserId/>} />
            <Route path='/blogs/:id' element={<BlogId />} />
            <Route path='/users' element={<UsersView/>} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
