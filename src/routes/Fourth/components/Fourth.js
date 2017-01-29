import React from 'react'

export const Fourth = (props) => (
  <div>
    <h2>Fourth: {props.message}</h2>
    <div>
      <input type='text' onChange={(e) => { props.setMessage(e.target.value) }} />
    </div>
    <button className='btn btn-default' onClick={props.addLetter}>
      Add Letter
    </button>
    <button className='btn btn-default' onClick={(e) => { props.setMessage('MESSAGE') }}>
      Set Message
    </button>

  </div>
)

export default Fourth

