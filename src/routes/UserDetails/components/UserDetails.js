import React, {PropTypes} from 'react'

export class UserDetails extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    created: PropTypes.string,
    errorText: PropTypes.string,
    fetching: PropTypes.bool,

    getUserDetails: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    this.props.getUserDetails(this.props.username)
  }

  render() {
    return (
      <div className='container'>
        <h2>{this.props.username}</h2>
        {this.props.fetching ? (
          <div>...loading</div>
        ) : this.props.errorText ? (
          <div>Error: {this.props.errorText}</div>
        ) : (
          <div>
            <div>
               Created: {this.props.created}
            </div>
          </div>
        ) }
      </div>
    )
  }
}

export default UserDetails
