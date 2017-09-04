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
  mobile: state.sidebar.mobile,
  loginPopup: state.popups.loginPopup,
  signupPopup: state.popups.signupPopup,
  userPopup: state.popups.userPopup,
  signPopup: state.popups.signPopup,
  errorText: state.auth.errorText
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
