import {connect} from 'react-redux'

import Content from './Content'

const mapDispatchToProps = {}

const mapStateToProps = (state, props) => ({
  sidebar: state.sidebar.isOpen,
  mobile: state.sidebar.mobile
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)
