import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  let hideWhenVisible
  let showWhenVisible

  if (props.buttonLabel === 'login') {
    hideWhenVisible = { display: visible ? '' : 'none' }
    showWhenVisible = { display: visible ? 'none' : '' }
  } else {
    hideWhenVisible = { display: visible ? 'none' : '' }
    showWhenVisible = { display: visible ? '' : 'none' }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })


  return (
    <div className='container__style'>
      <div style={hideWhenVisible} className='subcontainer__style'>
        <button id="revealButton" onClick={toggleVisibility} className='button__style'>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <p className='cancel__containerStyle'>
          <button onClick={toggleVisibility} className='cancel__style'>cancel</button>
        </p>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
