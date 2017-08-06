import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import ImportCollectionForm from './ImportCollectionForm'

export class CollectionsManager extends React.Component {
  static propTypes = {
    sendCollection: PropTypes.func.isRequired,
  }

  sendForm = (values) => {
    this.props.sendCollection(this.props.path, values.name, values.base, values.data.replace(/\\/g, '/'))
  }

  render() {
    return (
      <div className='container'>
        <h2>Collections Manager:</h2>
        <ImportCollectionForm
          onSubmit={this.sendForm}
          path={this.props.path}
          base={this.props.base}
        />
      </div>
    )
  }
}

export default CollectionsManager
