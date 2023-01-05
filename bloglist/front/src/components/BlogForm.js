import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2 className='subtitle__style'>create new</h2>
      <form onSubmit={addBlog} className='form__style'>
        <div className='input__containerStyle'>
          <div>
            <label className='label__style'>title</label>
            <input
              id="title"
              value={title}
              onChange={handleTitle}
              placeholder="title"
              className='input__firstStyle'
            />
          </div>
          <div>
            <label className='label__style'>author</label>
            <input
              id="author"
              value={author}
              onChange={handleAuthor}
              placeholder="author"
              className='input__mediumStyle'
            />
          </div>
          <div>
            <label className='label__style'>url</label>
            <input
              id="url"
              value={url}
              onChange={handleUrl}
              placeholder="url"
              className='input__lastStyle'
            />
          </div>
        </div>
        
        <button id="createButton" type="submit" className='button__style'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
