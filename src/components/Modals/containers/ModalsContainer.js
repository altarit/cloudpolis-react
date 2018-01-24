import {connect} from 'react-redux'

import Modals from '../components/Modals'

const mapDispatchToProps = {
  dispatch: action => action
}

const mapStateToProps = (state) => ({
  confirmationPopup: state.popups.confirmationPopup,
  singleInputPopup: state.popups.singleInputPopup,
  shade: state.popups.shade,
  popups: state.popups
})

export default connect(mapStateToProps, mapDispatchToProps)(Modals)
