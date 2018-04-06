import {connect} from 'react-redux'

import AccessLog from '../components/AccessLog'
import {getAccessLog, changeLimit, changePage} from '../modules/accessLog'

const mapDispatchToProps = {
  getAccessLog, changeLimit, changePage
}

const mapStateToProps = (state) => ({
  userName: state.auth.name,
  requests: state.accessLog.requests,
  fetching: state.accessLog.fetching,
  errorText: state.accessLog.errorText,
  filters: state.form.accessFilters,
  limit: state.accessLog.limit,
  page: state.accessLog.page,
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessLog)
