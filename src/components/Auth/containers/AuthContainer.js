import {connect} from 'react-redux'

import Auth from '../components/Auth'
import {
  hi,
  login,
  signup,
  logout,
  resetStatus
} from '../modules/authActions'

const mapDispatchToProps = {
  hi,
  login,
  signup,
  logout,
  resetStatus
}

const mapStateToProps = (state) => ({
  name: state.auth.name,
  loginPopup: state.popups.loginPopup,
  signupPopup: state.popups.signupPopup,
  userPopup: state.popups.userPopup,
  errorText: state.auth.errorText
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
