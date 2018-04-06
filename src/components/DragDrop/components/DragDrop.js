import React from 'react'
import PropTypes from 'prop-types'

import './DragDrop.scss'

export class DragDrop extends React.Component {
  static propTypes = {
    isTrackDrag: PropTypes.bool.isRequired,
    dragItem: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  mouseMove = (e) => {
    this.setState({left: e.clientX, top: e.clientY})
  }

  mouseUp= (e) => {
    console.log(e.clientY)
    setTimeout(this.props.trackDragEnd.bind(this), 0)
  }

  componentWillUnmount = () => {

  }

  componentWillReceiveProps = (newProps) => {
    console.log('componentWillReceiveProps')
    if (this.props.isTrackDrag && !newProps.isTrackDrag) {
      console.log('removed listeners')
      document.body.removeEventListener('mousemove', this.mouseMove)
      document.body.removeEventListener('mouseup', this.mouseUp)
    }
    if (!this.props.isTrackDrag && newProps.isTrackDrag) {
      console.log('set listeners')
      document.body.addEventListener('mousemove', this.mouseMove)
      document.body.addEventListener('mouseup', this.mouseUp)
    }
  }


  render() {
    if (!this.props.isTrackDrag) {
      return null
    }

    let dragTrack = (this.props.dragItem || {}).track

    return (
      <div className='drag-icon' style={{top: this.state.top + 50, left: this.state.left + 20}}>
        {dragTrack ? dragTrack.title  : 'Drag'}
      </div>
    )
  }
}


export default DragDrop
