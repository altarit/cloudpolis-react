import React, {PropTypes} from 'react'

import Header from '../../components/Header'

export const Content = (props) => (
  <div className={'content__out' + (props.sidebar ? ' content__out_shifted' : '')}>
    <Header sidebar={props.sidebar} mobile={props.mobile} />
    <div className='core-layout__viewport'>
      {props.children}
    </div>
  </div>
)

Content.propTypes = {
  sidebar: PropTypes.bool.isRequired,
  mobile: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
}

export default Content
