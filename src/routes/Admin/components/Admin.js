import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export class Admin extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }

  render() {
    return (
      <div className='container'>
        <h2>Admin: {this.props.name}</h2>
        <div>
          <Link to='/admin/access/'>Access Log</Link>
        </div>
        <div>
          <Link to={`/music/libraries/`}>Libraries</Link>
        </div>
      </div>
    )
  }
}

export default Admin
