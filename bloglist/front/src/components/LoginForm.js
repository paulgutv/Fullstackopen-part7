import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
}) => {
  return (
    <div className='login__container'>
      <div className='login__subcontainer'>
        <h2 className='title__style'>Log in to application</h2>
        <form onSubmit={handleLogin} id="loginForm" className='form__style'>
          <div className='login__inputContainer'>
            <div>
              <label className='label__style'>username</label>
              <input
                id="username"
                type="text"
                name="Username"
                onChange={handleUsername}
                placeholder="Username"
                className='input__firstStyle'
              />
            </div>
            <div>
              <label className='label__style'>password</label>
              <input
                id="password"
                type="password"
                name="Password"
                onChange={handlePassword}
                placeholder="Password"
                className='input__lastStyle'
              />
            </div>
          </div>          
          <button id="loginButton" type="submit" className='button__style'>
            login
          </button>
        </form>
      </div>      
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
}

export default LoginForm
