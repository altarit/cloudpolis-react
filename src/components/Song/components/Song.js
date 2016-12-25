import React from 'react'

export class Song extends React.Component {

  render() {
    return (
      <div>
        <button onClick={(e)=>{this.props.playSong(this.props)}}>Play</button>
        {this.props.title}
      </div>
    )
  }
}

export default Song
