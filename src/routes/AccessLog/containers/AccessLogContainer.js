import {connect} from 'react-redux'

import AccessLog from '../components/AccessLog'
import {getAccessLog} from '../modules/accessLog'

const mapDispatchToProps = {
  getAccessLog
}

const mapStateToProps = (state) => ({
  userName: state.auth.name,
  requests: state.accessLog.requests,
  fetching: state.accessLog.fetching,
  errorText: state.accessLog.errorText
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessLog)
