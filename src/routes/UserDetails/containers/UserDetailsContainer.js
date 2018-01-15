import {connect} from 'react-redux'

import {getUserDetails} from '../modules/userDetails'
import UserDetails from '../components/UserDetails'

const mapDispatchToProps = {
  getUserDetails
}

const mapStateToProps = (state, props) => ({
  fetching: state.userDetails.fetching,
  username: props.match.params.username,
  created: state.userDetails.created,
  errorText: state.userDetails.errorText
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
