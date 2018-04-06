import {connect} from 'react-redux'
import DragDrop from '../components/DragDrop'
import {trackDragEnd} from '../../../modules/player/playerActions'

const mapDispatchToProps = {
  trackDragEnd
}

const mapStateToProps = (state) => ({
  isTrackDrag: state.player.drag.isOn,
  dragItem: state.player.drag.item,
})

export default connect(mapStateToProps, mapDispatchToProps)(DragDrop)
