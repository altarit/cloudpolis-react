import { connect } from 'react-redux'

import { addLetter, setMessage } from '../modules/fourth'
import Fourth from '../components/Fourth'

const mapDispatchToProps = {
  addLetter: () => addLetter('B'),
  setMessage: (message) => setMessage(message || '')
}

const mapStateToProps = (state) => ({
  message: state.fourth
})

export default connect(mapStateToProps, mapDispatchToProps)(Fourth)
