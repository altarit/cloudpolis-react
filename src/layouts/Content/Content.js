import React from 'react'

import Header from '../../components/Header'

export class Content extends React.Component {

  render() {
    return <div className={"content__out" + (this.props.sidebar ? " content__out_shifted" : "")}>
      <Header />
      <div className="core-layout__viewport">
        {this.props.children}
      </div>
    </div>
  }
}

export default Content
