import { connect } from 'react-redux'

import Content from './Content'

const mapDispatchToProps = {
}

const mapStateToProps = (state, props) => ({
  sidebar: state.sidebar.isOpen
})

export default connect(mapStateToProps, mapDispatchToProps)(Content)
