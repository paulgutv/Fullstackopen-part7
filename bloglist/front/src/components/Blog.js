import {
  Link
} from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 50
  }

  return (
    <div className='list__container'>
      <div style={blogStyle} className="list__subcontainer">
        <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      </div>
    </div>
  )
}

export default Blog