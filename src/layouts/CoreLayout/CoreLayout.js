import React from 'react';
import Header from '../../components/Header';
import BottomBar from '../../components/BottomBar';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
    <BottomBar />
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
