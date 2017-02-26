import {connect} from 'react-redux'

import Admin from '../components/Admin'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  name: state.auth.name
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
