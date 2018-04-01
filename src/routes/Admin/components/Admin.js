import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export class Admin extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }

  render() {
    return (
      <div className='container'>
        <h2>Admin: {this.props.name}</h2>
        <div>
          <Link to='/admin/access/'></Link>
        </div>
        <div>
          <Link to={`/music/libraries/`}></Link>
        </div>
      </div>
    )
  }
}

export default Admin
