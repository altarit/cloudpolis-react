import {connect} from 'react-redux'

import {getUsers} from '../modules/users'
import Users from '../components/Users'

const mapDispatchToProps = {
  getUsers
}

const mapStateToProps = (state, props) => ({
  fetching: state.users.fetching,
  users: state.users.users
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
