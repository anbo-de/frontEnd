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
import s from './HomePage.scss';
import QueryBox from '../QueryBox';

class HomePage extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.container}>
        <img src="https://github.com/WDAqua/Qanary/blob/master/doc/WDAquaLogo2.png?raw=true" height="72" alt="WDAqua" className={s.logo}/>
        <QueryBox size="70"/>
      </div>
    );
  }

}
export default withStyles(HomePage, s);
