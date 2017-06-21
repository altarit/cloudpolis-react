import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import ImportCollectionForm from './ImportCollectionForm'

export class CollectionsManager extends React.Component {
  static propTypes = {
    sendCollection: PropTypes.func.isRequired,
    deleteCompilations: PropTypes.func.isRequired,
    deleteSongs: PropTypes.func.isRequired,
    extractSongs: PropTypes.func.isRequired
  }

  sendForm = (values) => {
    this.props.sendCollection(values.name, values.data.replace(/\\/g, '/'))
  }

  deleteCollections = () => {
    this.props.deleteCompilations()
  }

  deleteSongs = () => {
    this.props.deleteSongs()
  }

  extractSongs = () => {
    this.props.extractSongs()
  }

  render() {
    return (
      <div className='container'>
        <h2>Collections Manager:</h2>
        <ImportCollectionForm onSubmit={this.sendForm} />
        <div className='btn-group'>
          <button type='submit' className='btn btn-primary' onClick={this.deleteCollections}>Delete Artists</button>
          <button type='submit' className='btn btn-primary' onClick={this.deleteSongs}>Delete Songs</button>
          <button type='submit' className='btn btn-primary' onClick={this.extractSongs}>Extract Songs</button>
        </div>
      </div>
    )
  }
}

export default CollectionsManager
