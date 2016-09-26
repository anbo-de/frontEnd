/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HeaderContainer.scss';
import Header from '../Header';
import HeaderSearch from '../HeaderSearch';

class HeaderContainer extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  render() {

    return (
      <div>
      {this.props.path != '/about' ? <HeaderSearch/> : <Header/>}
      </div>
    );
  }

}

export default withStyles(HeaderContainer, s);

